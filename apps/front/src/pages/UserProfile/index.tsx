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
import {
  getUserProfile,
  updateProfilePic,
  updateUserProfile,
} from '../../services/api.ts';
import { AlertContent } from '../../declaration';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../Login/user.store.ts';

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

  const { userId } = useParams();
  const { user } = useUserStore();

  let { data, mutate } = useRequest(getUserProfile, {
    defaultParams: [userId || '0'],
  });

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

  const { run: updatePic } = useRequest(updateProfilePic, {
    manual: true,
    onSuccess: () => {
      // TODO MCO2 update the picture
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

  const handleProfilePicUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) updatePic(e.target.files[0]);
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
                  <VisuallyHiddenInput
                    onChange={handleProfilePicUpdate}
                    type="file"
                    required
                  />
                </Button>
              </div>
              <div className={'user-profile-information-container'}>
                {!yearEdit.isEditing ? (
                  <span className={'user-profile-color'}>
                    <span className={'user-profile-weight'}>
                      Year in DLSU:
                    </span>
                    {data?.yearsInDLSU}
                    {data?.id === user?.id && (
                      <EditIcon
                        fontSize={'inherit'}
                        onClick={() => {
                          setYearEdit({ ...yearEdit, isEditing: true });
                        }}
                      />
                    )}
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
                    {data?.id === user?.id && (
                      <EditIcon
                        fontSize={'inherit'}
                        onClick={() => {
                          setDescEdit({ ...descEdit, isEditing: true });
                        }}
                      />
                    )}
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
        {data?.history.length &&
          data?.history.map((history: API.UserHistory, index) => {
            return (
              <Card
                key={index}
                sx={{ maxWidth: '80%' }}
                className={`user-profile-reply-card ${
                  history.type === 'Review'
                    ? ''
                    : history.type === 'Reply'
                    ? 'user-profile-reply-border-blue'
                    : 'user-profile-submit-border-orange'
                }`}
              >
                <CardContent>
                  <h4>
                    {history.title} --- {history.type}
                  </h4>
                  {history.rating && (
                    <div className="user-profile-reply-rating">
                      <Rating
                        name="read-only"
                        value={history.rating}
                        readOnly
                      />
                    </div>
                  )}
                  <div className={'user-profile-reply-content'}>
                    {history.content}
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </motion.div>
    </div>
  );
}
