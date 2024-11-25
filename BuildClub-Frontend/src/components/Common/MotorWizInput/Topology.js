import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import DropdownInputField from '../DropdownInputField';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as EditIcon } from '../../../assets/images/icons/edit.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/icons/save.svg';
import TopologyComponentDrawer from '../DrawerText/TopologyDrawer';
import NoofpolesDrawer from '../DrawerText/NoofpolesDrawer';
import NoofSlotsDrawer from '../DrawerText/NoofSlotsDrawer';


const info = {
  topology: {
    hover: 'Opt for SPM motors if basic speed control suffices and cost-effectiveness is a priority and IPM motors for enhanced performance and advanced control techniques like field weakening.',
    // range: 'Range: -5 - 80',
    title: 'Topology',
    text: <TopologyComponentDrawer />,
  },
  numberOfPoles: {
    hover: 'Select from the available pole configurations. ',
    // range: 'Range: -5 - 80',
    title: 'Number of Poles',
    text: <NoofpolesDrawer />,
  },
  numberOfSlots: {
    hover: 'Choose from the available slot options.',
    // range: 'Range: -5 - 80',
    title: 'Number of Slots',
    text: <NoofSlotsDrawer />,
  },
};

const Topology = ({ handlePrevious, handleNext, toggleEdit }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [values, setValues] = useState({
    topology: 'IPMSM RADIAL',
    numberOfPoles: '10',
    numberOfSlots: '12',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const topologyOptions = [
    { value: 'IPMSM RADIAL', label: 'IPMSM RADIAL' },
    { value: 'SPMSM AXIAL', label: 'SPMSM AXIAL' },
  ];

  const polesOptions = [
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },
  ];

  const slotsOptions = [
    { value: '9', label: '9' },
    { value: '12', label: '12' },
    { value: '15', label: '15' },
  ];

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (toggleEdit) toggleEdit(); // Call the parent's toggleEdit if needed
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={0} maxWidth="800px">
        <DropdownInputField
          label="Topology"
          value={values.topology}
          onChange={handleChange('topology')}
          options={topologyOptions}
          info={info.topology}
          readOnly={!isEditable}
          sx={{display: 'flex', justifyContent: 'center'}}
        />
        <DropdownInputField
          label="No of Poles"
          value={values.numberOfPoles}
          onChange={handleChange('numberOfPoles')}
          options={polesOptions}
          info={info.numberOfPoles}
          readOnly={!isEditable}
        />
        <DropdownInputField
          label="No of Slots"
          value={values.numberOfSlots}
          onChange={handleChange('numberOfSlots')}
          options={slotsOptions}
          info={info.numberOfSlots}
          readOnly={!isEditable}
        />
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

export default Topology;
