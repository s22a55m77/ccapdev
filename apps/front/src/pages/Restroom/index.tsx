import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Rating,
  TextField,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import './index.css';
import ReplyCard from './components/ReplyCard.tsx';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRequest } from 'ahooks';
import {
  createRestroomReview,
  getRestroomDetail,
  voteRestroom,
} from '../../services/api.ts';
import { useState } from 'react';

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

  const { data: restroomData, run } = useRequest(getRestroomDetail, {
    defaultParams: [restroomId || '0'],
  });

  const handleVote = ({
    upVote,
    downVote,
  }: {
    upVote?: boolean;
    downVote?: boolean;
  }) => {
    if (restroomId && upVote)
      voteRestroom({ restroomId, upVote }).then(() => {
        run(restroomId);
      });
    else if (restroomId && downVote)
      voteRestroom({ restroomId, downVote }).then(() => {
        run(restroomId);
      });
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
        restroomId,
        content: userRating.comment,
        rating: userRating.rating,
      }).then(() => {
        setUserRating({ rating: 0, comment: '', isButtonDisable: true });
        run(restroomId);
      });
  };

  return (
    <div className={'restroom-container'}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <div id={'cards'}>
          <Card sx={{ maxWidth: '100%' }} className={'restroom'}>
            {/*fix me */}
            <CardHeader
              avatar={<Avatar />}
              title={restroomData?.createdByUser}
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
                {restroomData?.restroomImageIds.map((id) => {
                  return (
                    <img
                      key={id}
                      style={{ marginTop: 10 }}
                      src={id}
                      alt={'img'}
                      width={'30%'}
                    />
                  );
                })}
              </div>
              <div className={'restroom-image-container'}>
                {restroomData?.locationImageIds.map((id) => {
                  return (
                    <img
                      key={id}
                      style={{ marginTop: 10 }}
                      src={id}
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
                  <div className={'restroom-activity-content'}>
                    <ArrowDownwardIcon fontSize={'inherit'} />
                    {restroomData?.downVote}
                  </div>
                  <div className={'restroom-activity-content'}>
                    <ArrowUpwardIcon fontSize={'inherit'} />
                    {restroomData?.upVote}
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ boxShadow: 'none' }}
                    disabled={restroomData?.isDownVoted}
                    onClick={() => {
                      handleVote({ downVote: true });
                    }}
                  >
                    <ThumbDownAltIcon />
                  </Button>
                  <Button
                    startIcon={<ThumbUpAltIcon />}
                    variant="contained"
                    color="primary"
                    style={{ boxShadow: 'none' }}
                    disabled={restroomData?.isUpVoted}
                    onClick={() => {
                      handleVote({ upVote: true });
                    }}
                  >
                    Upvote
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
                  color="darkGreen"
                  disabled={userRating.isButtonDisable}
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
            restroomId={restroomId || ''}
            commentId={commentId}
            isParent={true}
          />
        ))}
      </motion.div>
    </div>
  );
}
