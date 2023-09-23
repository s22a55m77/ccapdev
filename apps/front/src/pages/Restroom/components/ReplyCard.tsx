import {Avatar, Button, Card, CardContent, CardHeader, Popover, TextField} from "@mui/material";
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import './ReplyCard.css'
import {useState} from "react";

export default function ReplyCard() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleReplyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplyClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id={'cards'} className={'card-container'}>
      {/*Main Reply*/}
      <Card sx={{maxWidth: '100%'}} className={'reply-card'}>
        {/*fix me */}
        <CardHeader
          avatar={
            <Avatar />
          }
          title="Placeholder"
          subheader="September 18, 2023"
        />
        <CardContent>
          <div className={'reply-content'}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla </div>
          <footer className={'reply-footer'}>
            <div className={'reply-vote'}>
              <div className={'reply-activity-vote'}><ThumbDownAltTwoToneIcon color={'inherit'} fontSize={'inherit'}/> 1 </div>
              <div className={'reply-activity-vote'}><ThumbUpAltTwoToneIcon color={'primary'} fontSize={'inherit'}/> 1 </div>
            </div>
            <div className={'reply-activity'}>
              <Button onClick={handleReplyClick}>
                <SubdirectoryArrowRightIcon fontSize={'inherit'} style={{marginRight: 5}}/>
                Reply
              </Button>
            </div>
          </footer>
        </CardContent>
      </Card>


      {/*Reply of a Reply*/}
      <Card sx={{maxWidth: '100%'}} className={'reply-card reply-border-blue'}>
        <CardContent>
          <div className={'reply-content'}> <b>@user</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla </div>
          <footer className={'reply-footer'}>
            <div className={'reply-vote'}>
              <div className={'reply-activity-vote'}><ThumbDownAltTwoToneIcon color={'inherit'} fontSize={'inherit'}/> 1 </div>
              <div className={'reply-activity-vote'}><ThumbUpAltTwoToneIcon color={'primary'} fontSize={'inherit'}/> 1 </div>
              <span className={'reply-user'}>by @user</span>
            </div>
            <div className={'reply-activity'}>
              <Button onClick={handleReplyClick}>
                <SubdirectoryArrowRightIcon fontSize={'inherit'} style={{marginRight: 5}}/>
                Reply
              </Button>
            </div>
          </footer>
        </CardContent>
      </Card>


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
          <div className={'flex'} style={{justifyContent: 'center'}}>
            <TextField multiline label='Reply' placeholder={'Type here your reply'} className={'comment-input'}/>
          </div>
          <div className={'reply-submit'}>
            <Button variant='contained' color='darkGreen'>Reply</Button>
          </div>
        </div>
      </Popover>
    </div>
  )
}
