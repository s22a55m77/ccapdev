import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Snackbar,
  TextField,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FlagIcon from '@mui/icons-material/Flag';
import './index.css';
import ReplyCard from './components/ReplyCard.tsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRequest } from 'ahooks';
import {
  createRestroomReview,
  getImage,
  getProfilePic,
  getRestroomDetail,
  reportRestroom,
} from '../../services/api.ts';
import React, { useState } from 'react';
import { AlertContent } from '../../declaration';
import { AxiosError } from 'axios';

type UserRating = {
  rating: number;
  comment?: string;
  isButtonDisable: boolean;
};

export default function Restroom() {
  const { restroomId } = useParams();
  const [userRating, setUserRating] = useState<UserRating>({
    rating: 0,
    isButtonDisable: false,
  });
  const [alertContent, setAlertContent] = useState<AlertContent>({
    isOpen: false,
    message: 'default message',
    severity: 'success',
  });

  const [isReportDisable, setIsReportDisable] = useState(false);

  const navigate = useNavigate();

  const { data: restroomData, run } = useRequest(getRestroomDetail, {
    defaultParams: [restroomId || '0'],
    onError: (e) => {
      if ((e as AxiosError).response?.status === 404) navigate('/404');
    },
  });

  const { run: report } = useRequest(reportRestroom, {
    manual: true,
    onSuccess: () => {
      setAlertContent({
        isOpen: true,
        message: 'Successfully Reported',
        severity: 'success',
      });
    },
  });

  const handleReport = () => {
    if (restroomId) report({ id: Number(restroomId) });

    setIsReportDisable(true);
  };

  const handleRateClick = (value: number | null) => {
    if (value) setUserRating({ ...userRating, rating: value });
  };

  const handleCommentInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value)
      setUserRating({ ...userRating, comment: e.target.value });
  };

  const handleRateSubmit = () => {
    if (userRating?.rating && restroomId)
      createRestroomReview({
        restroomId: Number(restroomId),
        content: userRating.comment,
        rating: userRating.rating,
      })
        .then(() => {
          setUserRating({ rating: 0, comment: '', isButtonDisable: true });
          run(restroomId);
          setAlertContent({
            isOpen: true,
            message: 'Successfully Rated',
            severity: 'success',
          });
        })
        .catch(() => {
          setAlertContent({
            isOpen: true,
            message: 'Error Occurred',
            severity: 'error',
          });
        });
  };

  return (
    <div className={'restroom-container'}>
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
        <div id={'cards'}>
          <Card sx={{ maxWidth: '100%' }} className={'restroom'}>
            <CardHeader
              avatar={
                <Avatar
                  src={getProfilePic(restroomData?.createdByUserId || 0)}
                />
              }
              title={
                <Link to={`/user/${restroomData?.createdByUserId || 0}`}>
                  {restroomData?.createdByUser}
                </Link>
              }
              subheader={restroomData?.createdAt}
            />
            <CardContent>
              <div id="title">
                <b>{restroomData?.title}</b>
              </div>
              <Rating
                name="read-only"
                value={restroomData?.rating || 0}
                precision={0.5}
                readOnly
                className="rating"
              />
              <div className={'restroom-content'}>
                {restroomData?.location}
              </div>
              {/*TODO MCO2*/}
              <div className={'restroom-image-container'}>
                {restroomData?.restroomImageIds.map((id, index) => {
                  return (
                    <img
                      key={id + index}
                      style={{ marginTop: 10 }}
                      src={getImage(id)}
                      alt={'img'}
                      width={'30%'}
                    />
                  );
                })}
                {restroomData?.locationImageIds.map((id, index) => {
                  return (
                    <img
                      key={id + index}
                      style={{ marginTop: 10 }}
                      src={getImage(id)}
                      alt={'img'}
                      width={'30%'}
                    />
                  );
                })}
              </div>

              <footer className={'restroom-footer'}>
                <div id="tags" className={'restroom-tags'}>
                  {restroomData?.tags.map((tag) => {
                    return (
                      <div key={tag} className={'restroom-tag'}>
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <div className={'restroom-activity'}>
                  <div className={'restroom-activity-content'}>
                    <ChatBubbleOutlineIcon fontSize={'inherit'} />
                    {restroomData?.totalComments}
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ boxShadow: 'none' }}
                    className={'vote-button'}
                    size="small"
                    onClick={handleReport}
                    disabled={isReportDisable}
                  >
                    <FlagIcon />
                  </Button>
                </div>
              </footer>
            </CardContent>
          </Card>
        </div>
        <div className={'comments'}>Rating</div>
        <div className={'comment-input-card'}>
          <Card style={{ padding: '40px', paddingBottom: '20px' }}>
            <CardContent>
              <Rating
                defaultValue={0}
                value={userRating.rating}
                onChange={(_, value) => {
                  handleRateClick(value);
                }}
              />
              <div className={'flex'} style={{ justifyContent: 'center' }}>
                <TextField
                  multiline
                  label="Comment"
                  placeholder={'Type here your comment (Optional)'}
                  className={'comment-input'}
                  onChange={handleCommentInput}
                  value={userRating.comment}
                />
              </div>
              <div className={'submit-box'}>
                <Button
                  variant="contained"
                  color="green"
                  disabled={
                    userRating.isButtonDisable || userRating.rating == 0
                  }
                  onClick={handleRateSubmit}
                >
                  Rate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {restroomData?.commentsIds.map((commentId) => (
          <ReplyCard
            key={commentId}
            restroomId={Number(restroomId) || 0}
            commentId={commentId}
            isParent={true}
          />
        ))}
      </motion.div>
    </div>
  );
}
