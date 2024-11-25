import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import InputField from '../InputField';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as EditIcon } from '../../../assets/images/icons/edit.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/icons/save.svg';
import AspectRatioDrawer from '../DrawerText/AspectRatioDrawer';
import MagnetLengthDrawer from '../DrawerText/MagnetLengthDrawer';
import AirgapDrawer from '../DrawerText/AirgapDrawer';
import ToothDepthFactorDrawer from '../DrawerText/ToothDepthfactordrawer';
import TRVDrawer from '../DrawerText/TRVDrawer';


const info = {
  aspectRatio: {
    hover: 'Nominal value is around 0.5 .',
    range: 'Range: 0.25 - 1',
    title: 'Aspect Ratio',
    text: <AspectRatioDrawer />,
  },
  magnetLength: {
    hover: 'A quick and approximate way to gauge magnet length is to estimate it at around 5 to 10 times the length of the air gap. ',
    range: 'Range: 3 - 7',
    title: 'Aspect Ratio',
    text: <MagnetLengthDrawer />,
  },
  airGap: {
    hover: 'Optimum value is around 0.5 to 1mm.',
    range: 'Range: 0.3 - 1.5',
    title: 'Air Gap (mm)',
    text: <AirgapDrawer />,
  },
  toothDepthFactor: {
    hover: 'The nominal value is between 0.43 and 0.67',
    range: 'Range: 0.3 - 0.8',
    title: 'Tooth Depth Factor',
    text: <ToothDepthFactorDrawer />,
  },
  trv: {
    hover: 'The torque-per-rotor-volume for rare-earth magnets is restricted to 0.1 Nm/cc, with a range typically spanning from 0.05 to 0.1 Nm/cc.',
    range: 'Range: 0.01 - 0.11',
    title: 'TRV (Nm/cc)',
    text: <TRVDrawer />,
  },
};

const inputGridStyle = {
  display:'flex',
  justifyContent: 'center',
};

const Geometry = ({ handlePrevious, handleNext, toggleEdit }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [values, setValues] = useState({
    aspectRatio: '0.8',
    magnetLength: '5',
    airGap: '0.5',
    toothDepthFactor: '0.5',
    trv: '0.1',
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
            label="Aspect Ratio"
            value={values.aspectRatio}
            onChange={handleChange('aspectRatio')}
            info={info.aspectRatio}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label={
              <span>
                Magnet 'Length' <strong>(mm)</strong>
              </span>
            }
            value={values.magnetLength}
            onChange={handleChange('magnetLength')}
            info={info.magnetLength}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label={
              <span>
               Air Gap <strong>(mm)</strong>
              </span>
            }
            value={values.airGap}
            onChange={handleChange('airGap')}
            info={info.airGap}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label="Tooth Depth Factor"
            value={values.toothDepthFactor}
            onChange={handleChange('toothDepthFactor')}
            info={info.toothDepthFactor}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{...inputGridStyle}}>
          <InputField
            label={
              <span>
               TRV <strong>(Nm/cc)</strong>
              </span>
            }
            value={values.trv}
            onChange={handleChange('trv')}
            info={info.trv}
            readOnly={!isEditable}
          />
        </Grid>
      </Grid>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px' }}>
        <Button
          variant="contained"
          onClick={handlePrevious}
          style={{ backgroundColor: '#0069BD', borderRadius: '32px', color: '#fff', textTransform: 'none', fontFamily: 'Poppins',
            fontWeight: '400', }}
          startIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleEdit}
          style={{ backgroundColor: '#0069BD', borderRadius: '32px', color: '#fff', textTransform: 'none', fontFamily: 'Poppins',
            fontWeight: '400', }}
          startIcon={isEditable ? <SaveIcon /> : <EditIcon />}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          style={{ backgroundColor: '#0069BD', borderRadius: '32px', color: '#fff', textTransform: 'none', fontFamily: 'Poppins',
            fontWeight: '400', }}
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Geometry;
