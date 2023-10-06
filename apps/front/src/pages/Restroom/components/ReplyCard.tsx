import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Popover,
  Rating,
  Snackbar,
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
import {
  changeVoteStatus,
  createRestroomReview,
  deleteRestroomReview,
  getCommentDetail,
  updateRestroomReview,
} from '../../../services/api.ts';
import { AlertContent } from '../../../declaration';
import { useUserStore } from '../../Login/user.store.ts';

type ReplyCardProps = {
  restroomId: string;
  isParent: boolean;
  commentId: string;
};

type Edit = {
  isEdit: boolean;
  value?: string;
};

export default function ReplyCard({
  restroomId,
  isParent,
  commentId,
}: ReplyCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [edit, setEdit] = useState<Edit>({ isEdit: false });
  const [replyEdit, setReplyEdit] = useState<string>();
  const open = Boolean(anchorEl);
  const [alertContent, setAlertContent] = useState<AlertContent>({
    isOpen: false,
    message: 'default message',
    severity: 'success',
  });

  const { data: commentDetail, mutate } = useRequest(getCommentDetail, {
    defaultParams: [commentId],
  });

  const currentUser = useUserStore((state) => state.user);

  const { run: updateReview } = useRequest(updateRestroomReview, {
    manual: true,
    onSuccess: (data) => {
      setEdit({ ...edit, isEdit: false });
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

  const { run: createReview } = useRequest(createRestroomReview, {
    manual: true,
    onSuccess: (data) => {
      mutate(data);
      setAnchorEl(null);
      setAlertContent({
        isOpen: true,
        message: 'Successfully Replied',
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

  const { run: deleteReview } = useRequest(deleteRestroomReview, {
    manual: true,
    onSuccess: (data) => {
      //TODO: check
      setAlertContent({
        isOpen: true,
        message: 'Successfully Deleted',
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

  const { run: vote } = useRequest(changeVoteStatus, {
    manual: true,
    onSuccess: (data) => {
      mutate(data);
    },
  });

  const handleReplyClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplyClose = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape')
      setEdit({ ...edit, isEdit: false, value: '' });
    else if (event.key === 'Enter') {
      if (edit.value)
        updateReview({ restroomId, commentId, content: edit.value });
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEdit({ ...edit, value: e.target.value });
  };

  const handleReplyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setReplyEdit(e.target.value);
  };

  const handleReplySubmit = () => {
    createReview({
      restroomId,
      commentTo: commentId,
      content: replyEdit,
    });
  };

  const handleUpVote = () => {
    if (commentDetail?.isUpVoted) vote({ newStatus: 0, commentId });
    else vote({ newStatus: 1, commentId });
  };

  const handleDownVote = () => {
    if (commentDetail?.isDownVoted) vote({ newStatus: 0, commentId });
    else vote({ newStatus: 2, commentId });
  };

  const handleDelete = () => {
    // TODO 删除的逻辑, deleteRestroomReview()
    deleteReview(restroomId);
  };

  return (
    <div id={'cards'} className={'card-container'}>
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
              <b>@{commentDetail?.commentToUser}</b>
            )}
            {!edit.isEdit ? (
              <div className={'reply-content'}>
                {isParent && (
                  <div className="reply-rating">
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                )}

                {currentUser?.id === commentDetail?.commentByUserId &&
                  commentDetail?.content && (
                    <EditIcon
                      fontSize={'inherit'}
                      color={'action'}
                      onClick={() => {
                        setEdit({ ...edit, isEdit: true });
                      }}
                    />
                  )}
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
                    value={edit.value || commentDetail?.content}
                    onKeyDown={handleKeyDown}
                    onChange={handleEditChange}
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
                    onClick={handleDownVote}
                  />
                  {commentDetail?.downVote}
                </div>
                <div className={'reply-activity-vote'}>
                  <ThumbUpAltTwoToneIcon
                    color={`${
                      commentDetail?.isUpVoted ? 'primary' : 'inherit'
                    }`}
                    fontSize={'inherit'}
                    onClick={handleUpVote}
                  />
                  {commentDetail?.upVote}
                </div>
                {!isParent && (
                  <span className={'reply-user'}>
                    by @{commentDetail?.commentBy}
                  </span>
                )}
              </div>
              <div className={'reply-activity'}>
                {
                  /*TODO 删除按钮只会出现在：
                            当前登录用户是comment的， ??? === commentDetail?.commentByUserId
                            当前用户是admin ???.role === 'ADMIN' 
                            TODO: CHECK*/
                  (currentUser?.id === commentDetail?.commentByUserId ||
                    currentUser?.id === 'ADMIN') && (
                    <Button onClick={handleDelete} color={'error'}>
                      Delete
                    </Button>
                  )
                }
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
          return (
            <ReplyCard
              key={id}
              restroomId={restroomId}
              isParent={false}
              commentId={id}
            />
          );
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
              onChange={handleReplyChange}
            />
          </div>
          <div className={'reply-submit'}>
            <Button
              variant="contained"
              color="green"
              onClick={() => {
                handleReplySubmit();
              }}
            >
              Reply
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
