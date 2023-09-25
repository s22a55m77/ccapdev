import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Popover,
  Rating,
  TextField,
} from '@mui/material';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import './ReplyCard.css';
import React, { useState } from 'react';

type ReplyCardProps = {
  isParent: boolean;
  commentId: string;
};

export default function ReplyCard({}: ReplyCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const open = Boolean(anchorEl);

  const handleReplyClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplyClose = () => {
    setAnchorEl(null);
  };

  // TODO
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') setIsEdit(false);
    else if (event.key === 'Enter') setIsEdit(false);
  };

  return (
    <div id={'cards'} className={'card-container'}>
      {/*Main Reply*/}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <Card sx={{ maxWidth: '100%' }} className={'reply-card'}>
          {/*fix me */}
          <CardHeader
            avatar={<Avatar />}
            title="Placeholder"
            subheader="September 18, 2023"
          />
          <CardContent>
            {!isEdit ? (
              <div className={'reply-content'}>
                <div className="reply-rating">
                  <Rating name="read-only" value={5} readOnly />
                </div>
                <EditIcon
                  fontSize={'inherit'}
                  color={'action'}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Consequat aliquet
                maecenas ut sit nulla
              </div>
            ) : (
              <div>
                <Rating value={5} />
                <div
                  className={'flex'}
                  style={{ justifyContent: 'center' }}
                >
                  <TextField
                    multiline
                    label="Comment"
                    placeholder={'Type here your comment (Optional)'}
                    className={'comment-input'}
                    value={'123'}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </div>
              </div>
            )}
            <footer className={'reply-footer'}>
              <div className={'reply-vote'}>
                <div className={'reply-activity-vote'}>
                  <ThumbDownAltTwoToneIcon
                    color={'inherit'}
                    fontSize={'inherit'}
                  />
                  1
                </div>
                <div className={'reply-activity-vote'}>
                  <ThumbUpAltTwoToneIcon
                    color={'primary'}
                    fontSize={'inherit'}
                  />
                  1
                </div>
              </div>
              <div className={'reply-activity'}>
                <Button onClick={handleReplyClick}>
                  <SubdirectoryArrowRightIcon
                    fontSize={'inherit'}
                    style={{ marginRight: 5 }}
                  />
                  Reply
                </Button>
              </div>
            </footer>
          </CardContent>
        </Card>
      </motion.div>

      {/*Reply of a Reply*/}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <Card
          sx={{ maxWidth: '100%' }}
          className={'reply-card reply-border-blue'}
        >
          <CardContent>
            <div className={'reply-content'}>
              <b>@user</b>
              {!isEdit ? (
                <div className={'reply-content'}>
                  <EditIcon
                    fontSize={'inherit'}
                    color={'action'}
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Consequat aliquet
                  maecenas ut sit nulla
                </div>
              ) : (
                <div
                  className={'flex'}
                  style={{ justifyContent: 'center', marginTop: '10px' }}
                >
                  <TextField
                    multiline
                    label="Comment"
                    placeholder={'Type here your comment (Optional)'}
                    className={'comment-input'}
                    value={'123'}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <footer className={'reply-footer'}>
              <div className={'reply-vote'}>
                <div className={'reply-activity-vote'}>
                  <ThumbDownAltTwoToneIcon
                    color={'inherit'}
                    fontSize={'inherit'}
                  />
                  1
                </div>
                <div className={'reply-activity-vote'}>
                  <ThumbUpAltTwoToneIcon
                    color={'primary'}
                    fontSize={'inherit'}
                  />
                  1
                </div>
                <span className={'reply-user'}>by @user</span>
              </div>
              <div className={'reply-activity'}>
                <Button onClick={handleReplyClick}>
                  <SubdirectoryArrowRightIcon
                    fontSize={'inherit'}
                    style={{ marginRight: 5 }}
                  />
                  Reply
                </Button>
              </div>
            </footer>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <Card
          sx={{ maxWidth: '100%' }}
          className={'reply-card reply-border-blue'}
        >
          <CardContent>
            <div className={'reply-content'}>
              <b>@user</b>
              {!isEdit ? (
                <div className={'reply-content'}>
                  <EditIcon
                    fontSize={'inherit'}
                    color={'action'}
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Consequat aliquet
                  maecenas ut sit nulla
                </div>
              ) : (
                <div
                  className={'flex'}
                  style={{ justifyContent: 'center', marginTop: '10px' }}
                >
                  <TextField
                    multiline
                    label="Comment"
                    placeholder={'Type here your comment (Optional)'}
                    className={'comment-input'}
                    value={'123'}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <footer className={'reply-footer'}>
              <div className={'reply-vote'}>
                <div className={'reply-activity-vote'}>
                  <ThumbDownAltTwoToneIcon
                    color={'inherit'}
                    fontSize={'inherit'}
                  />
                  1
                </div>
                <div className={'reply-activity-vote'}>
                  <ThumbUpAltTwoToneIcon
                    color={'primary'}
                    fontSize={'inherit'}
                  />
                  1
                </div>
                <span className={'reply-user'}>by @user</span>
              </div>
              <div className={'reply-activity'}>
                <Button onClick={handleReplyClick}>
                  <SubdirectoryArrowRightIcon
                    fontSize={'inherit'}
                    style={{ marginRight: 5 }}
                  />
                  Reply
                </Button>
              </div>
            </footer>
          </CardContent>
        </Card>
      </motion.div>


      {/* Reply Input Box */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleReplyClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className={'reply-input-box'}>
          <div className={'flex'} style={{ justifyContent: 'center' }}>
            <TextField
              multiline
              label="Reply"
              placeholder={'Type here your reply'}
              className={'comment-input'}
            />
          </div>
          <div className={'reply-submit'}>
            <Button variant="contained" color="darkGreen">
              Reply
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
