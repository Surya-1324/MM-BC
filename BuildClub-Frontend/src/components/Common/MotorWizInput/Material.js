import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import InputField from '../InputField';
import DropdownInputField from '../DropdownInputField';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as EditIcon } from '../../../assets/images/icons/edit.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/icons/save.svg';
import WireMaterialDrawer from '../DrawerText/WireMaterialDrawer';
import WireGaugeDrawer from '../DrawerText/WireGaugeDrawer';
import SteelDrawer from '../DrawerText/SteelDrawer';
import MagnetDrawer from '../DrawerText/MagnetDrawer';
import FillFactorDrawer from '../DrawerText/FillFactorDrawer';


const Material = ({ handlePrevious, handleNext, toggleEdit }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [values, setValues] = useState({
    wireMaterial: 'Copper',
    magnet: 'N42',
    wireGauge: '18 SWG',
    steel: 'M250-35A',
    fillFactor: '35',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const wireMaterialOptions = [
    { value: 'Copper', label: 'Copper' },
    { value: 'Aluminum', label: 'Aluminum' },
  ];

  const magnetOptions = [
    { value: 'N42', label: 'N42' },
  ];

  const wireGaugeOptions = [
    { value: '18 SWG', label: '18 SWG' },
    { value: '19 SWG', label: '19 SWG' },
    { value: '20 SWG', label: '20 SWG' },
    { value: '21 SWG', label: '21 SWG' },
    { value: '22 SWG', label: '22 SWG' },
    { value: '23 SWG', label: '23 SWG' },
    { value: '24 SWG', label: '24 SWG' },
    { value: '25 SWG', label: '25 SWG' },
    { value: '26 SWG', label: '26 SWG' },
    { value: '27 SWG', label: '27 SWG' },
    { value: '28 SWG', label: '28 SWG' },
    { value: '29 SWG', label: '29 SWG' },
    { value: '30 SWG', label: '30 SWG' },
  ];

  const steelOptions = [
    { value: 'M250-35A', label: 'M250-35A' },
  ];

  const info = {
    wireMaterial: {
    hover: 'Click to learn more',
    // range: 'Range: 0.01 - 0.11',
    title: 'Wire Material',
    text: <WireMaterialDrawer />, // Replace with the actual image path if available
    },
    magnet: {
      hover: 'Click to learn more',
      // range: 'Range: 0.01 - 0.11',
      title: 'Magnet',
      text: <MagnetDrawer />, // Replace with the actual image path if available
    },
    wireGauge: {
      hover: 'There is not a definitive optimal value, but typically, 22 SWG is commonly used.',
      // range: 'Range: 0.01 - 0.11',
      title: 'Wire Gauge',
      text: <WireGaugeDrawer />, // Replace with the actual image path if available
    },
    steel: {
      hover: 'Click to learn more',
      // range: 'Range: 1 - 100',
      title: 'Steel',
      text: <SteelDrawer />,// Replace with the actual image path if available
    },
    fillFactor: {
      hover: 'A fill factor of more than 40% is generally not feasible unless there is a steep increase in manufacturing cost.',
      range: 'Range: 1 - 100',
      title: 'Fill Factor (%)',
      text: <FillFactorDrawer />, // Replace with the actual image path if available
    },
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (toggleEdit) toggleEdit(); // Call the parent's toggleEdit if needed
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={0} maxWidth="800px">
        <DropdownInputField
          label="Wire Material"
          value={values.wireMaterial}
          onChange={handleChange('wireMaterial')}
          options={wireMaterialOptions}
          info={info.wireMaterial}
          readOnly={!isEditable}
        />
        <DropdownInputField
          label="Magnet"
          value={values.magnet}
          onChange={handleChange('magnet')}
          options={magnetOptions}
          info={info.magnet}
          readOnly={!isEditable}
        />
        <DropdownInputField
          label="Wire Gauge"
          value={values.wireGauge}
          onChange={handleChange('wireGauge')}
          options={wireGaugeOptions}
          info={info.wireGauge}
          readOnly={!isEditable}
        />
        <DropdownInputField
          label="Steel"
          value={values.steel}
          onChange={handleChange('steel')}
          options={steelOptions}
          info={info.steel}
          readOnly={!isEditable}
        />
        <Grid item xs={12} sm={6} sx={{display:'flex', justifyContent: 'center'}}>
          <InputField
            label={
              <span>
                Fill Factor <strong>(%)</strong>
              </span>
            }
            value={values.fillFactor}
            onChange={handleChange('fillFactor')}
            info={info.fillFactor}
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

export default Material;
