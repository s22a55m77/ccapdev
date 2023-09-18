import './App.css'
import Grid from '@mui/material/Unstable_Grid2';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {createTheme, ThemeProvider, PaletteColorOptions} from "@mui/material";
import Sidebar from "./components/Sidebar";

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


const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    green: createColor('#04AA6D'),
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container spacing={0}>
          <Grid md={12}>
            <div className={'navbar'}>
              <Navbar />
            </div>
          </Grid>
          <Grid md={2}>
            <div className={'side'}>
              <Sidebar />
            </div>
          </Grid>
          <Grid md={10}>
            <div>
              <Outlet />
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default App
