import logo from '../../assets/logo.png';
import './index.css'
import {Button} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
export default function Navbar() {
  return (
    <div className={'nav-container'}>
      <div className={'flex'}>
        <div>
          <img src={logo} alt='logo' className={'image'} width={40} height={40}/>
        </div>
        <div className={'v-center m-10'}>
          DLSU toiletTo<b>PICK</b>
        </div>
      </div>
      <div>
        <Button variant='contained' color={'green'} startIcon={<PersonAddAltIcon/>}>Register</Button>
        <Button style={{marginLeft: '10px'}} variant='outlined'>Login</Button>
      </div>
    </div>
  )
}
