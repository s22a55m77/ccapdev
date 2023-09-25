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
import { useRequest } from 'ahooks';
import { getCommentDetail } from '../../../services/api.ts';

type ReplyCardProps = {
  isParent: boolean;
  commentId: string;
};

export default function ReplyCard({
  isParent,
  commentId,
}: ReplyCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const open = Boolean(anchorEl);

  const { data: commentDetail } = useRequest(getCommentDetail, {
    defaultParams: [commentId],
  });

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
        <Card
          sx={{ maxWidth: '100%' }}
          className={`reply-card ${isParent ? '' : 'reply-border-blue'}`}
        >
          {/*fix me */}
          {isParent && (
            <CardHeader
              avatar={<Avatar />}
              title={commentDetail?.commentBy}
              subheader={commentDetail?.commentAt}
            />
          )}

          <CardContent>
            {commentDetail?.commentToUser && (
              <b>{commentDetail?.commentToUser}</b>
            )}
            {!isEdit ? (
              <div className={'reply-content'}>
                {isParent && (
                  <div className="reply-rating">
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                )}

                {/*TODO determine if the current user is the author*/}
                <EditIcon
                  fontSize={'inherit'}
                  color={'action'}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
                {commentDetail?.content}
              </div>
            ) : (
              <div>
                {isParent && <Rating value={5} />}
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
                    color={`${
                      commentDetail?.isDownVoted ? 'primary' : 'inherit'
                    }`}
                    fontSize={'inherit'}
                  />
                  1
                </div>
                <div className={'reply-activity-vote'}>
                  <ThumbUpAltTwoToneIcon
                    color={`${
                      commentDetail?.isUpVoted ? 'primary' : 'inherit'
                    }`}
                    fontSize={'inherit'}
                  />
                  1
                </div>
                {!isParent && (
                  <span className={'reply-user'}>
                    by @{commentDetail?.commentBy}
                  </span>
                )}
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

      {commentDetail?.childComments &&
        commentDetail?.childComments.map((id) => {
          return <ReplyCard key={id} isParent={false} commentId={id} />;
        })}

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
