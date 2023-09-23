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
            <Link to="/">
            <div className={'flex item active'}>
              {/*TODO Fix css*/}
                <FormatListBulletedIcon
                  fontSize={'inherit'}
                  className={'v-center'}
                />
                Toilet

            </div>
            </Link>
            <Link to="/submit-restroom">
              <div className={'flex item'}>
                  <FormatListBulletedIcon
                    fontSize={'inherit'}
                    className={'v-center'}
                  />
                  Submit
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
