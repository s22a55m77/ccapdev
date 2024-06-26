import './index.css';
import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRestroomList } from '../../pages/Main/restroom-list.store.ts';
import { useUserStore } from '../../pages/Login/user.store.ts';

export default function Sidebar() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const isLogin = useUserStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
  }, [user]);

  const originalList = useRestroomList((state) => state.originalList);
  const setRestroomList = useRestroomList(
    (state) => state.setRestroomList,
  );

  const handleSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchText = e.target.value;

    if (searchText) {
      const newList = originalList.filter((restroom) =>
        restroom.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setRestroomList(newList);
    } else {
      setRestroomList(originalList);
    }
  };

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
            onChange={handleSearch}
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
            {isLogin && (
              <Link to="/submit-restroom" className={'link-style'}>
                <div
                  className={`flex item ${
                    location.pathname === '/submit-restroom'
                      ? 'active'
                      : ''
                  }`}
                >
                  <EditNoteIcon
                    fontSize={'inherit'}
                    className={'v-center'}
                  />
                  Submit
                </div>
              </Link>
            )}

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
                  Report
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
