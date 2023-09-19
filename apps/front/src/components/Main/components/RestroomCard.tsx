import {Avatar, Card, CardContent, CardHeader} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import './RestroomCard.css';

export default function RestroomCard() {
  return (
    <>
      <div id={'cards'} className={'card-container'}>
        <Card sx={{maxWidth: '100%'}} className={'card'}>
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
            <div className={'card-content'}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla </div>
            {/*fix it*/}
            <img style={{marginTop: 10}} src={'src/assets/toilet.png'} alt={'img'} width={'30%'}/>
            <footer className={'card-footer'}>
              <div id='tags' className={'tags'}>
                <div className={'tag'}>Tag</div>
                <div className={'tag'}>Tag</div>
              </div>
              <div className={'activity'}>
                <div className={'activity-content'}><ChatBubbleOutlineIcon fontSize={'inherit'}/> 1 </div>
                <div className={'activity-content'}><ArrowUpwardIcon fontSize={'inherit'}/> 1 </div>
              </div>
            </footer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
