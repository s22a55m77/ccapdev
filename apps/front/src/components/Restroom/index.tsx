import {Avatar, Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import './index.css';
import ReplyCard from "./components/ReplyCard.tsx";

export default function Restroom() {
  return (
    <>
      <div id={'cards'} className={'card-container'}>
        <Card sx={{maxWidth: '100%'}} className={'restroom'}>
          {/*fix me */}
          <CardHeader
            avatar={
              <Avatar />
            }
            title="Placeholder"
            subheader="September 18, 2023"
          />
          <CardContent>
            <div id='title'><b>Title</b></div>
            <div className={'restroom-content'}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla </div>
            {/*fix it*/}
            <img style={{marginTop: 10}} src={'src/assets/toilet.png'} alt={'img'} width={'30%'}/>
            <footer className={'restroom-footer'}>
              <div id='tags' className={'restroom-tags'}>
                <div className={'restroom-tag'}>Tag</div>
                <div className={'restroom-tag'}>Tag</div>
              </div>
              <div className={'restroom-activity'}>
                <div className={'restroom-activity-content'}><ChatBubbleOutlineIcon fontSize={'inherit'}/> 1 </div>
                <div className={'restroom-activity-content'}><ArrowDownwardIcon fontSize={'inherit'}/> 1 </div>
                <div className={'restroom-activity-content'}><ArrowUpwardIcon fontSize={'inherit'}/> 1 </div>
                <Button variant='contained' color='error' style={{boxShadow: 'none'}}>
                  <ThumbDownAltIcon/>
                </Button>
                <Button startIcon={<ThumbUpAltIcon/>} variant='contained' color='primary' style={{boxShadow: 'none'}}>
                  Upvote
                </Button>
              </div>
            </footer>
          </CardContent>
        </Card>
      </div>
      <div className={'comments'}>
        Comments
      </div>
      <div className={'comment-input-card'}>
        <Card style={{padding: '40px', paddingBottom: '20px'}}>
          <CardContent>
            <div className={'flex'} style={{justifyContent: 'center'}}>
              <TextField multiline label='Comment' placeholder={'Type here your comment'} className={'comment-input'}/>
            </div>
            <div className={'submit-box'}>
              <Button variant='contained' color='darkGreen'>Comment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <ReplyCard />
    </>
  )
}
