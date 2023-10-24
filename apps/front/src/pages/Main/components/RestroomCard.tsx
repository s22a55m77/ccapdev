import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './RestroomCard.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link } from 'react-router-dom';

type RestroomCardProps = Omit<
  API.RestroomListData[0],
  'building' | 'gender' | 'floor'
>;

export default function RestroomCard({
  id,
  title,
  tags,
  rating,
  restroomImageIds,
  createdByUser,
  createdAt,
  downVote,
  upVote,
  totalComments,
  location,
}: RestroomCardProps) {
  return (
    <>
      <Link to={`/restroom/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <div id={'cards'} className={'card-container'}>
          <Card sx={{ maxWidth: '100%' }} className={'card'}>
            {/*TODO MCO2 */}
            <CardHeader
              avatar={<Avatar />}
              title={createdByUser}
              subheader={createdAt}
            />
            <CardContent>
              <div id="title">
                <b>{title}</b>
              </div>
              <Rating
                name="read-only"
                value={rating}
                readOnly
                className="rating"
              />
              <div className={'card-content'}> {location} </div>
              <div className={'restroom-card-image-container'}>
                {/*TODO MCO2*/}
                {restroomImageIds?.map((id, index) => {
                  return (
                    <img
                      key={id + index}
                      style={{ marginTop: 10 }}
                      src={id}
                      alt={'img'}
                      width={'30%'}
                    />
                  );
                })}
              </div>

              <footer className={'card-footer'}>
                {/*tags*/}
                <div id="tags" className={'tags'}>
                  {tags?.map((tag) => (
                    <div key={tag} className="tag">
                      {tag}
                    </div>
                  ))}
                </div>

                <div className={'activity'}>
                  <div className={'activity-content'}>
                    {/*Comments Number*/}
                    <ChatBubbleOutlineIcon fontSize={'inherit'} />{' '}
                    {totalComments}
                  </div>
                </div>
              </footer>
            </CardContent>
          </Card>
        </div>
      </Link>
    </>
  );
}
