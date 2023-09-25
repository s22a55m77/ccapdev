import { Avatar, Button, styled, TextField } from '@mui/material';
import './index.css';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

export default function UserProfile() {
  const [isYearEdit, setIsYearEdit] = useState(false);
  const [isDescEdit, setIsDescEdit] = useState(false);

  const handleKeyDown = (
    event: React.KeyboardEvent,
    identifier: string,
  ) => {
    if (identifier === 'year') {
      if (event.key === 'Escape') setIsYearEdit(false);
      else if (event.key === 'Enter') setIsYearEdit(false);
    } else if (identifier === 'desc') {
      if (event.key === 'Escape') setIsDescEdit(false);
      else if (event.key === 'Enter') setIsDescEdit(false);
    }
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
                <Avatar sx={{ width: 100, height: 100 }} />
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
                {!isYearEdit ? (
                  <span className={'user-profile-color'}>
                    <span className={'user-profile-weight'}>
                      Year in DLSU:
                    </span>
                    10{' '}
                    <EditIcon
                      fontSize={'inherit'}
                      onClick={() => {
                        setIsYearEdit(true);
                      }}
                    />
                  </span>
                ) : (
                  <TextField
                    label="Year in DLSU"
                    className={'year-input'}
                    value={'123'}
                    type={'number'}
                    onKeyDown={(event) => {
                      handleKeyDown(event, 'year');
                    }}
                    autoFocus
                    size={'small'}
                  />
                )}
                {!isDescEdit ? (
                  <span className={'user-profile-color'}>
                    <span className={'user-profile-weight'}>
                      Description:
                    </span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Consequat aliquet maecenas ut sit nulla Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit.
                    Consequat aliquet maecenas ut sit nulla
                    <EditIcon
                      fontSize={'inherit'}
                      onClick={() => {
                        setIsDescEdit(true);
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
