import './App.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import {
  createTheme,
  ThemeProvider,
  PaletteColorOptions,
} from '@mui/material';
import Sidebar from './components/Sidebar';
import { useEffect } from 'react';
import { useUserStore } from './pages/Login/user.store.ts';
import { logout, me, refreshToken } from './services/api.ts';

declare module '@mui/material/styles' {
  interface CustomPalette {
    green: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    green: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    green: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    green: createColor('#04AA6D'),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});

function App() {
  const { setUser, setUserLoginState } = useUserStore();

  window.onload = function () {
    const tabCount = localStorage.getItem('tabCount') || '0';
    const count = parseInt(tabCount) + 1;
    localStorage.setItem('tabCount', count.toString());
  };

  window.onbeforeunload = function () {
    const tabCount = localStorage.getItem('tabCount') || '0';
    const count = parseInt(tabCount) - 1;
    localStorage.setItem('tabCount', count.toString());
    if (document.visibilityState === 'hidden') {
      if (isLastTab() && !localStorage.getItem('lastLoginTime')) logout();
    }
  };

  const isLastTab = () => {
    return localStorage.getItem('tabCount') === '-1';
  };

  useEffect(() => {
    document.title = 'toiletToPick';

    me()
      .then((userData) => {
        setUserLoginState(true);
        setUser(userData);

        const lastLoginTime = localStorage.getItem('lastLoginTime');
        if (lastLoginTime)
          if (new Date().toDateString() > lastLoginTime) {
            localStorage.setItem(
              'lastLoginTime',
              new Date().toDateString(),
            );
            refreshToken();
          }
      })
      .catch(() => {
        setUserLoginState(false);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container spacing={0}>
          <Grid xs={12}>
            <div className={'navbar'}>
              <Navbar />
            </div>
          </Grid>
          <Grid xs={12} md={2} lg={2}>
            <div className={'side'} style={{ overflow: 'hidden' }}>
              <Sidebar />
            </div>
          </Grid>
          <Grid xs={12} md={10} lg={10}>
            <div>
              <Outlet />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={'about'}>
        <Link to={'/about'} style={{ color: '#595959' }}>
          About
        </Link>
      </div>
    </ThemeProvider>
  );
}

export default App;
