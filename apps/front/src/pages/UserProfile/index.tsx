import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Rating,
  Snackbar,
  styled,
  TextField,
} from '@mui/material';
import './index.css';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRequest } from 'ahooks';
import { me, updateUserProfile } from '../../services/api.ts';
import { AlertContent } from '../../declaration';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Edit = {
  isEditing: boolean;
  value?: string;
};

export default function UserProfile() {
  const [yearEdit, setYearEdit] = useState<Edit>({ isEditing: false });
  const [descEdit, setDescEdit] = useState<Edit>({ isEditing: false });
  const [alertContent, setAlertContent] = useState<AlertContent>({
    isOpen: false,
    message: 'default message',
    severity: 'success',
  });
  let { data, mutate } = useRequest(me);

  const { run: updateProfile } = useRequest(updateUserProfile, {
    manual: true,
    onSuccess: (data) => {
      if (yearEdit.isEditing) setYearEdit({ value: '', isEditing: false });
      if (descEdit.isEditing) setDescEdit({ value: '', isEditing: false });

      mutate(data);

      setAlertContent({
        isOpen: true,
        message: 'Successfully Edited',
        severity: 'success',
      });
    },
    onError: () => {
      setAlertContent({
        isOpen: true,
        message: 'Error Occurred',
        severity: 'error',
      });
    },
  });

  const handleKeyDown = (
    event: React.KeyboardEvent,
    identifier: string,
  ) => {
    if (identifier === 'year') {
      if (event.key === 'Escape') {
        setYearEdit({ value: undefined, isEditing: false });
      } else if (event.key === 'Enter') {
        if (yearEdit?.value) {
          updateProfile({ yearsInDLSU: Number(yearEdit.value) });
        }
      }
    } else if (identifier === 'desc') {
      if (event.key === 'Escape')
        setDescEdit({ value: undefined, isEditing: false });
      else if (event.key === 'Enter') {
        updateProfile({ description: descEdit?.value });
      }
    }
  };

  const handleDescChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDescEdit({ ...descEdit, value: e.target.value });
  };

  const handleYearChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setYearEdit({ ...yearEdit, value: e.target.value });
  };

  return (
    <div className={'user-profile-container'}>
      <Snackbar
        open={alertContent.isOpen}
        autoHideDuration={1000}
        onClose={() => {
          setAlertContent({ ...alertContent, isOpen: false });
        }}
      >
        <Alert severity={alertContent.severity}>
          {alertContent.message}
        </Alert>
      </Snackbar>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <div>
          <div className={'user-profile-card'}>
            <div className={'user-profile-card-content'}>
              <div className={'avatar-container'}>
                {/*TODO MCO2*/}
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={data?.profilePicId}
                />
                <Button
                  component="label"
                  variant={'contained'}
                  size={'small'}
                  startIcon={<CloudUploadIcon />}
                  className={'profile-pic-update-button'}
                >
                  Update
                  <VisuallyHiddenInput type={'file'} />
                </Button>
              </div>
              <div className={'user-profile-information-container'}>
                {!yearEdit.isEditing ? (
                  <span className={'user-profile-color'}>
                    <span className={'user-profile-weight'}>
                      Year in DLSU:
                    </span>
                    {data?.yearsInDLSU}
                    <EditIcon
                      fontSize={'inherit'}
                      onClick={() => {
                        setYearEdit({ ...yearEdit, isEditing: true });
                      }}
                    />
                  </span>
                ) : (
                  <TextField
                    label="Year in DLSU"
                    className={'year-input'}
                    value={yearEdit?.value || data?.yearsInDLSU}
                    type={'number'}
                    onKeyDown={(event) => {
                      handleKeyDown(event, 'year');
                    }}
                    autoFocus
                    size={'small'}
                    onChange={handleYearChange}
                  />
                )}
                {!descEdit.isEditing ? (
                  <span className={'user-profile-color'}>
                    <span className={'user-profile-weight'}>
                      Description:
                    </span>
                    {data?.description}
                    <EditIcon
                      fontSize={'inherit'}
                      onClick={() => {
                        setDescEdit({ ...descEdit, isEditing: true });
                      }}
                    />
                  </span>
                ) : (
                  <TextField
                    multiline
                    label="Description"
                    className={'description-input'}
                    onKeyDown={(event) => {
                      handleKeyDown(event, 'desc');
                    }}
                    autoFocus
                    size={'small'}
                    value={descEdit?.value || data?.description}
                    onChange={handleDescChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <h2 className={'user-profile-h2'}> History </h2>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        {/*TODO 把这个弄成另一个组件，然后从这里请求的数据中.map循环再通过props传过去*/}
        <Card
          sx={{ maxWidth: '80%' }}
          className={'user-profile-reply-card'}
        >
          <CardContent>
            <h4>Title --- Review</h4>
            <div className="user-profile-reply-rating">
              <Rating name="read-only" value={5} readOnly />
            </div>
            <div className={'user-profile-reply-content'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Consequat aliquet maecenas
              ut sit nulla
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <Card
          sx={{ maxWidth: '80%' }}
          className={
            'user-profile-reply-card user-profile-reply-border-blue'
          }
        >
          <CardContent>
            <h4>Title --- Reply</h4>
            <b>@user</b>
            <div className={'user-profile-reply-content'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Consequat aliquet maecenas
              ut sit nulla
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <Card
          sx={{ maxWidth: '80%' }}
          className={
            'user-profile-reply-card user-profile-submit-border-orange'
          }
        >
          <CardContent>
            <h4>Title --- Submit</h4>
            <div className={'user-profile-reply-content'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Consequat aliquet maecenas
              ut sit nulla
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
