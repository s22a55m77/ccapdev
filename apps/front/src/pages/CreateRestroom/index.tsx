import './index.css';
import { motion } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export default function Index() {
  return (
    <section className="restroom-form-section">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50, backdropFilter: 'blur(20px)' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className={'form-box'}
      >
        <div>
          <form action="">
            <h2 className="restroom-form-h2">Restroom forms</h2>
            <FormControl fullWidth required>
              <div className={'flex'} style={{ alignItems: 'center' }}>
                <InputLabel id="building-label">Building</InputLabel>
                <Select
                  id="building"
                  labelId="building-label"
                  label="Building *"
                  value="building 1"
                  sx={{ width: '90%' }}
                >
                  <MenuItem value="building 1">building 1</MenuItem>
                </Select>
                <LocationOnOutlinedIcon />
              </div>
            </FormControl>
            <div className="smallbox">
              <FormControl fullWidth required>
                <div className={'flex'} style={{ alignItems: 'center' }}>
                  <InputLabel id="building-label">Floor</InputLabel>
                  <Select
                    id="building"
                    labelId="building-label"
                    label="Floor *"
                    value="floor 1"
                    sx={{ width: '70%' }}
                  >
                    <MenuItem value="floor 1">floor 1</MenuItem>
                  </Select>
                  <LayersOutlinedIcon />
                </div>
              </FormControl>
              <FormControl fullWidth required>
                <div className={'flex'} style={{ alignItems: 'center' }}>
                  <InputLabel id="building-label">Gender</InputLabel>
                  <Select
                    id="building"
                    labelId="building-label"
                    label="Gender *"
                    value="Male"
                    sx={{ width: '80%' }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Male">Female</MenuItem>
                  </Select>
                  <WcOutlinedIcon />
                </div>
              </FormControl>
            </div>
            <div>
              <TextField
                label={'Location Description'}
                multiline
                sx={{ width: '90%' }}
              />
            </div>
            <p className={'restroom-form-p'}>Availability:</p>
            <div className="availbox">
              <div className="availability">
                <input type="checkbox" name="avail" id="vending" />
                <label htmlFor="vending">Vending Machine</label>

                <input type="checkbox" name="avail" id="baghook" />
                <label htmlFor="baghook">Bag Hook</label>

                <input type="checkbox" name="avail" id="hand" />
                <label htmlFor="hand">Hand Sanitizer</label>
              </div>
            </div>
          </form>
        </div>
        <div className="second-column">
          <div className="picturebox">
            <ion-icon name="water-outline"></ion-icon>
            <input type="file" id="picture" required multiple />
            <label htmlFor="picture">Upload the Location Picture</label>
          </div>
          <div className="picturebox">
            <ion-icon name="water-outline"></ion-icon>
            <input type="file" id="picture" required multiple />
            <label htmlFor="picture">Upload the Restroom Picture</label>
          </div>
          <button className={'restroom-form-button'}>Submit</button>
        </div>
      </motion.div>
    </section>
  );
}
