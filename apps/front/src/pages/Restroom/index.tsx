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
import { getRestroomDetail } from '../../services/api.ts';

export default function Restroom() {
  const { restroomId } = useParams();

  const { data: restroomData } = useRequest(getRestroomDetail, {
    defaultParams: [restroomId || '0'],
  });

  console.log(restroomData);

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
              title="Placeholder"
              subheader="September 18, 2023"
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
              {/*fix it*/}
              <img
                style={{ marginTop: 10 }}
                src={'src/assets/toilet.png'}
                alt={'img'}
                width={'30%'}
              />
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
                  >
                    <ThumbDownAltIcon />
                  </Button>
                  <Button
                    startIcon={<ThumbUpAltIcon />}
                    variant="contained"
                    color="primary"
                    style={{ boxShadow: 'none' }}
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
              <Rating defaultValue={0} />
              <div className={'flex'} style={{ justifyContent: 'center' }}>
                <TextField
                  multiline
                  label="Comment"
                  placeholder={'Type here your comment (Optional)'}
                  className={'comment-input'}
                />
              </div>
              <div className={'submit-box'}>
                <Button variant="contained" color="darkGreen">
                  Rate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {restroomData?.commentsIds.map((commentId) => (
          <ReplyCard
            key={commentId}
            commentId={commentId}
            isParent={true}
          />
        ))}
      </motion.div>
    </div>
  );
}
