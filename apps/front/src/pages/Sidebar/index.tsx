import './index.css';
import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(true);

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
            <Link to="/" className={'link-style'}>
              <div
                className={`flex item ${
                  location.pathname === '/' ? 'active' : ''
                }`}
              >
                <FormatListBulletedIcon
                  fontSize={'inherit'}
                  className={'v-center'}
                />
                Toilet
              </div>
            </Link>
            <Link to="/submit-restroom" className={'link-style'}>
              <div
                className={`flex item ${
                  location.pathname === '/submit-restroom' ? 'active' : ''
                }`}
              >
                <EditNoteIcon
                  fontSize={'inherit'}
                  className={'v-center'}
                />
                Submit
              </div>
            </Link>
            {isAdmin && (
              <Link to="/admin-table" className={'link-style'}>
                <div
                  className={`flex item ${
                    location.pathname === '/admin-table' ? 'active' : ''
                  }`}
                >
                  <ChecklistIcon
                    fontSize={'inherit'}
                    className={'v-center'}
                  />
                  Table
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
