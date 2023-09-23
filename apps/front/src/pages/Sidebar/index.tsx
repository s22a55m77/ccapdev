import './index.css';
import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <>
      <div className={'container'}>
        <div>
          <Input
            placeholder="search"
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
            <div className={'flex item active'}>
              {/*TODO Fix css*/}
              <Link to="/">
                <FormatListBulletedIcon
                  fontSize={'inherit'}
                  className={'v-center'}
                />
                Toilet
              </Link>
            </div>
            <div className={'flex item'}>
              <Link to="/submit-restroom">
                <FormatListBulletedIcon
                  fontSize={'inherit'}
                  className={'v-center'}
                />
                Submit Restroom
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
