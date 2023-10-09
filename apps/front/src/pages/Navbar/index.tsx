import logo from '../../assets/logo.png';
import './index.css';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../Login/user.store.ts';
import { logout } from '../../services/api.ts';

export default function Navbar() {
  const { user, isLogin } = useUserStore();
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>();
  const open = Boolean(avatarAnchor);

  const navigate = useNavigate();

  const handleAvatarClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAvatarAnchor(event.currentTarget);
  };

  const handleAvataClose = () => {
    setAvatarAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setAvatarAnchor(null);
  };

  return (
    <div className={'nav-container'}>
      <Link to="/">
        <div className={'flex'}>
          <div>
            <img
              src={logo}
              alt="logo"
              className={'image'}
              width={40}
              height={40}
            />
          </div>
          <div className={'v-center m-10'}>
            DLSU toiletTo<b>PICK</b>
          </div>
        </div>
      </Link>

      <div>
        {!isLogin ? (
          <div>
            <Button
              id="navbar-register"
              variant="contained"
              color={'green'}
              startIcon={<PersonAddAltIcon />}
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant="outlined"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
          </div>
        ) : (
          <div>
            <Button id="basic-button" onClick={handleAvatarClick}>
              <Avatar></Avatar>
            </Button>
          </div>
        )}
      </div>
      <Menu
        anchorEl={avatarAnchor}
        open={open}
        onClose={handleAvataClose}
        transformOrigin={{
          vertical: 10,
          horizontal: 100,
        }}
      >
        <MenuItem onClick={handleAvataClose}>
          <Link to={`/user/${user?.id}`}>
            <span className={'user-profile'}>
              <PersonIcon />
              User Profile
            </span>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <span className={'logout'}>
            <LogoutIcon />
            Logout
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
}
