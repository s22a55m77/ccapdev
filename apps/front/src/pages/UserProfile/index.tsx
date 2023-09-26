import { Avatar, Button, styled, TextField } from '@mui/material';
import './index.css';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRequest } from 'ahooks';
import { me, updateUserProfile } from '../../services/api.ts';

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
  let { data, run } = useRequest(me);

  const handleKeyDown = (
    event: React.KeyboardEvent,
    identifier: string,
  ) => {
    if (identifier === 'year') {
      if (event.key === 'Escape') {
        setYearEdit({ value: undefined, isEditing: false });
      } else if (event.key === 'Enter') {
        if (yearEdit?.value) {
          updateUserProfile({ yearsInDLSU: Number(yearEdit.value) })
            .then(() => {
              setYearEdit({ ...yearEdit, isEditing: false });
              run();
            })
            .catch(() => {
              //TODO do something when update is failed
            });
        }
      }
    } else if (identifier === 'desc') {
      if (event.key === 'Escape')
        setDescEdit({ value: undefined, isEditing: false });
      else if (event.key === 'Enter') {
        updateUserProfile({ description: descEdit?.value })
          .then(() => {
            setDescEdit({ value: undefined, isEditing: false });
            // refetch the data if successfully updated
            run();
          })
          .catch(() => {
            //TODO do something when update is failed
          });
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
    </div>
  );
}
