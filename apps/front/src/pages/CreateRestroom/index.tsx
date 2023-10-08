import './index.css';
import { motion } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import buildingInfo from '../Main/buildingInfo.ts';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { createRestroom } from '../../services/api.ts';
import { AlertContent } from '../../declaration';
import { useRequest } from 'ahooks';

type SubmitRestroomForm = {
  building: string;
  floor: number;
  gender: 'FEMALE' | 'MALE';
  description: string;
  vending: boolean;
  baghook: boolean;
  hand: boolean;
  locationImage: FileList[];
  restroomImage: FileList[];
};

export default function Index() {
  const { register, handleSubmit, setValue, control } =
    useForm<SubmitRestroomForm>({
      defaultValues: {
        building: buildingInfo[0].buildingName,
        floor: 1,
        gender: 'MALE',
      },
    });
  const [selectedBuilding, setSelectedBuilding] = useState(
    buildingInfo[0].buildingName,
  );

  const [alertContent, setAlertContent] = useState<AlertContent>({
    isOpen: false,
    message: 'default message',
    severity: 'success',
  });

  const { run: create } = useRequest(createRestroom, {
    manual: true,
    onSuccess: () => {
      setAlertContent({
        isOpen: true,
        message: 'Successfully Submitted',
        severity: 'success',
      });
    },
    onError: () => {
      setAlertContent({
        isOpen: true,
        message: 'Error Occurred',
        severity: 'error',
      });
    },
  });

  const onSubmit = (data: SubmitRestroomForm) => {
    let tags: string[] = [];
    if (data.hand) tags.push('hand');
    if (data.vending) tags.push('vending');
    if (data.baghook) tags.push('baghook');

    create({
      location: data.description,
      building: data.building,
      floor: data.floor,
      gender: data.gender,
      tags: tags,
      locationImages: data.locationImage,
      restroomImages: data.restroomImage,
    });
  };

  return (
    <>
      <Snackbar
        open={alertContent.isOpen}
        autoHideDuration={1000}
        onClose={() => {
          setAlertContent({ ...alertContent, isOpen: false });
        }}
      >
        <Alert severity={alertContent.severity}>
          {alertContent.message}
        </Alert>
      </Snackbar>
      <section className="restroom-form-section">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 50, backdropFilter: 'blur(20px)' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className={'form-box'}
        >
          <div style={{ width: '40%', maxWidth: '40%' }}>
            <form id="restroomForm" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="restroom-form-h2">Restroom forms</h2>
              <Controller
                control={control}
                name="building"
                render={({ field }) => (
                  <FormControl fullWidth required>
                    <div
                      className={'flex'}
                      style={{ alignItems: 'center' }}
                    >
                      <InputLabel id="building-label">Building</InputLabel>
                      <Select
                        {...register('building')}
                        id="building"
                        labelId="building-label"
                        label="Building *"
                        value={field.value}
                        onChange={(e) => {
                          setSelectedBuilding(e.target.value);
                          setValue('building', e.target.value);
                          setValue('floor', 1);
                        }}
                        sx={{ width: '90%' }}
                      >
                        {buildingInfo.map((building) => {
                          return (
                            <MenuItem
                              key={building.buildingName}
                              value={building.buildingName}
                            >
                              {building.buildingName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <LocationOnOutlinedIcon />
                    </div>
                  </FormControl>
                )}
              />

              <div className="smallbox">
                <Controller
                  control={control}
                  name="floor"
                  render={({ field }) => (
                    <FormControl fullWidth required>
                      <div
                        className={'flex'}
                        style={{ alignItems: 'center' }}
                      >
                        <InputLabel id="building-label">Floor</InputLabel>
                        <Select
                          {...register('floor')}
                          id="building"
                          labelId="building-label"
                          label="Floor *"
                          value={field.value}
                          sx={{ width: '70%' }}
                        >
                          {[
                            ...Array(
                              buildingInfo.find(
                                (building) =>
                                  building.buildingName ===
                                  selectedBuilding,
                              )!.maxFloor,
                            ),
                          ].map((_, i) => {
                            const floor = i + 1;

                            return (
                              <MenuItem key={floor} value={floor}>
                                {floor}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <LayersOutlinedIcon />
                      </div>
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormControl fullWidth required>
                      <div
                        className={'flex'}
                        style={{ alignItems: 'center' }}
                      >
                        <InputLabel id="building-label">Gender</InputLabel>
                        <Select
                          {...register('gender')}
                          id="building"
                          labelId="building-label"
                          label="Gender *"
                          value={field.value}
                          sx={{ width: '80%' }}
                        >
                          <MenuItem value="MALE">Male</MenuItem>
                          <MenuItem value="FEMALE">Female</MenuItem>
                        </Select>
                        <WcOutlinedIcon />
                      </div>
                    </FormControl>
                  )}
                />
              </div>
              <div>
                <TextField
                  {...register('description')}
                  label={'Location Description'}
                  multiline
                  sx={{ width: '90%' }}
                />
              </div>
              <p className={'restroom-form-p'}>Availability:</p>
              <div className="availbox">
                <div className="availability">
                  <Controller
                    control={control}
                    name="vending"
                    render={() => (
                      <>
                        <input
                          {...register('vending')}
                          type="checkbox"
                          name="avail"
                          id="vending"
                        />
                        <label htmlFor="vending">Vending Machine</label>
                      </>
                    )}
                  />

                  <Controller
                    control={control}
                    name="baghook"
                    render={() => (
                      <>
                        <input
                          {...register('baghook')}
                          type="checkbox"
                          name="avail"
                          id="baghook"
                        />
                        <label htmlFor="baghook">Bag Hook</label>
                      </>
                    )}
                  />

                  <Controller
                    control={control}
                    name="hand"
                    render={() => (
                      <>
                        <input
                          {...register('hand')}
                          type="checkbox"
                          name="avail"
                          id="hand"
                        />
                        <label htmlFor="hand">Hand Sanitizer</label>
                      </>
                    )}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="second-column">
            <div className="picturebox">
              <input
                {...register('locationImage')}
                type="file"
                id="picture"
                required
                multiple
              />
              <label htmlFor="picture">
                Upload Location Picture <PhotoCameraBackIcon />
              </label>
            </div>
            <div className="picturebox">
              <input
                {...register('restroomImage')}
                type="file"
                id="picture"
                required
                multiple
              />
              <label htmlFor="picture">
                Upload Restroom Picture <PhotoCameraBackIcon />
              </label>
            </div>
            <button
              type="submit"
              form="restroomForm"
              className={'restroom-form-button'}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
