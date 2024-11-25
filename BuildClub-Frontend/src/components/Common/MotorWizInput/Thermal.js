import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import InputField from '../InputField';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as EditIcon } from '../../../assets/images/icons/edit.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/icons/save.svg';
import YokeHousingDrawer from '../DrawerText/YokeHousingDrawer';
import LHousingLStackDrawer from '../DrawerText/LHousingLStackDrawer';
import ConvectiveHTCDrawer from '../DrawerText/ConvectiveHTCDrawer';
import AmbientTemperatureDrawer from '../DrawerText/AmbienttemperatureDrawer';


const info = {
  yokeHousingHTC: {
    hover: 'Value lies between 375 to 25000 W/(m2K) depending upon the fit of stator with the housing. ',
    range: 'Range: 400 - 25000',
    title: 'Yoke-Housing HTC (W/m2K)',
    text: <YokeHousingDrawer />,
  },
  lHsgLStk: {
    hover: 'Click to learn more',
    range: 'Range: 40 - 150',
    title: 'L_hsg - L_stk (mm)',
    text: <LHousingLStackDrawer />,
  },
  convectiveHTC: {
    hover: 'For natural take value as 10 W/(m2K) and for forced take value between 25 – 40 W/(m2K). For liquid cooling take value between 50 - 10000 W/(m2K).',
    range: 'Range: 10 - 10000',
    title: 'Convective HTC (W/m2K)',
    text: <ConvectiveHTCDrawer />,
  },
  finAreaFactor: {
    hover: 'The nominal value of this factor is between 1 and 4. A value higher than 4 could obstruct airflow and decrease the heat transfer',
    range: 'Range: 1 - 4',
    title: 'Fin Area Factor',
    text: <ConvectiveHTCDrawer />,
  },
  
ambientTemperature: {
    hover: 'Average ambient temperature of your motor operating environment.',
    range: 'Range: -5 - 80',
    title: 'Ambient Temperature (°C)',
    text: <AmbientTemperatureDrawer />,
  },
};

const inputGridStyle = {
  display:'flex',
  justifyContent: 'center',
};

const Thermal = ({ handlePrevious, handleRun, toggleEdit }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [values, setValues] = useState({
    yokeHousingHTC: '20000',
    lHsgLStk: '70',
    convectiveHTC: '30',
    finAreaFactor: '3.5',
    ambientTemperature: '40',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (toggleEdit) toggleEdit(); // Call the parent's toggleEdit if needed
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={0} maxWidth="800px">
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label={
              <span>
                Yoke-Housing HTC <strong>(W/m²K)</strong>
              </span>
            }
            value={values.yokeHousingHTC}
            onChange={handleChange('yokeHousingHTC')}
            info={info.yokeHousingHTC}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label={
              <span>
                L_hsg-L_stk <strong>(mm)</strong>
              </span>
            }
            value={values.lHsgLStk}
            onChange={handleChange('lHsgLStk')}
            info={info.lHsgLStk}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label={
              <span>
                Convective HTC <strong>(W/m²K)</strong>
              </span>
            }
            value={values.convectiveHTC}
            onChange={handleChange('convectiveHTC')}
            info={info.convectiveHTC}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label="Fin Area Factor"
            value={values.finAreaFactor}
            onChange={handleChange('finAreaFactor')}
            info={info.finAreaFactor}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
        <InputField
          label={
            <span>
              Ambient Temperature <strong>(°C)</strong>
            </span>
          }
          value={values.ambientTemperature}
          onChange={handleChange('ambientTemperature')}
          info={info.ambientTemperature}
          readOnly={!isEditable}
        />
        </Grid>
      </Grid>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px' }}>
        <Button
          variant="contained"
          onClick={handlePrevious}
          style={{ backgroundColor: '#0069BD', borderRadius: '32px', color: '#fff', textTransform: 'none', fontFamily: 'Poppins',
            fontWeight: '400',}}
          startIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleEdit}
          style={{ backgroundColor: '#0069BD', borderRadius: '32px', color: '#fff',textTransform: 'none', fontFamily: 'Poppins',
            fontWeight: '400', }}
          startIcon={isEditable ? <SaveIcon /> : <EditIcon />}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>
        <Button
          variant="contained"
          onClick={handleRun}
          style={{ backgroundColor: '#0069BD', borderRadius: '32px', color: '#fff',textTransform: 'none', fontFamily: 'Poppins',
            fontWeight: '400', }}
          endIcon={<ArrowForwardIcon />}
        >
          Run
        </Button>
      </div>
    </div>
  );
};

export default Thermal;
