import './index.css'
import {Input, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function Sidebar() {
  return (
    <>
      <div className={'container'}>
        <div>
          <Input
            placeholder='search'
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </div>
        <div className={'mt-50'}>
          <span className={'menu'}>MENU</span>
          <div className={'category'}>
            <div className={'flex item active'}> <FormatListBulletedIcon fontSize={'inherit'} className={'v-center'}/> Toilet </div>
            <div className={'flex item'}> <FormatListBulletedIcon fontSize={'inherit'} className={'v-center'}/> Placeholder </div>
          </div>
        </div>
      </div>
    </>
  )
}
