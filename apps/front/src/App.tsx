import './App.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Outlet } from 'react-router-dom';
import Navbar from './pages/Navbar';
import {
  createTheme,
  ThemeProvider,
  PaletteColorOptions,
} from '@mui/material';
import Sidebar from './pages/Sidebar';
import { useEffect } from 'react';

declare module '@mui/material/styles' {
  interface CustomPalette {
    green: PaletteColorOptions;
    darkGreen: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    green: true;
    darkGreen: true;
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
    darkGreen: createColor('#04AA6D'),
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
  useEffect(() => {
    document.title = 'DLSU toileToPick';
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
    </ThemeProvider>
  );
}

export default App;
