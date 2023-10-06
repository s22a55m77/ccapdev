import './index.css';
import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRestroomList } from '../Main/restroom-list.store.ts';
import { useUserStore } from '../Login/user.store.ts';

export default function Sidebar() {
  const location = useLocation();
  // TODO 把initialState改为false
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    //   TODO 调用useUserStore取出user, 如果role是Admin再调用setIsAdmin改为true
    const user = useUserStore((state) => state.user);
    if (user && user.role === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);

  const restroomList = useRestroomList((state) => state.restroomList);
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
