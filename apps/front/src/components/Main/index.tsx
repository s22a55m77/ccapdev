import './index.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {Avatar, Card, CardContent, CardHeader} from "@mui/material";

export default function Main() {
  // const classes = useStyles();

  return (
    <div className={'main-container'}>
      <div id={'tabs'} className={'flex'}>
        <button className={'tab-button tab-button-active'}>
          <div style={{display: 'flex'}}>
            <AccessTimeIcon fontSize={'inherit'} style={{marginRight: 5}}/> New
          </div>
        </button>
        <button className={'tab-button'}>
          <div style={{display: 'flex'}}>
            <CallMadeIcon fontSize={'inherit'} style={{marginRight: 5}}/> Top
          </div>
        </button>
      </div>
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
    </div>
  )
}
