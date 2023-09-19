import { Avatar, Card, CardContent, CardHeader } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './RestroomCard.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type RestroomCardProps = Omit<
  API.RestroomListData[0],
  'id' | 'building' | 'gender' | 'floor'
>;

export default function RestroomCard({
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
            <div className={'card-content'}> {location} </div>
            {/*TODO MCO2*/}
            <img
              style={{ marginTop: 10 }}
              src={'src/assets/toilet.png'}
              alt={'img'}
              width={'30%'}
            />
            <footer className={'card-footer'}>
              {/*tags*/}
              <div id="tags" className={'tags'}>
                {tags.map((tag) => (
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
                <div className={'activity-content'}>
                  {/*Upvote*/}
                  <ArrowDownwardIcon fontSize={'inherit'} />
                  {upVote}
                </div>
                <div className={'activity-content'}>
                  {/*Down vote*/}
                  <ArrowUpwardIcon fontSize={'inherit'} />
                  {downVote}
                </div>
              </div>
            </footer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
