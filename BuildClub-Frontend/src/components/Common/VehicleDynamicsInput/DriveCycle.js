import React, { useState } from 'react';
import { Button } from '@mui/material';
import LineChartDC from '../LineChartDC';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as EditIcon } from '../../../assets/images/icons/edit.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/icons/save.svg';



const DriveCycle = ({ handlePrevious, handleRun }) => {
  
  const [isEditable, setIsEditable] = useState(false);

  // const handleChange = (name) => (event) => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <p style={{fontSize: '14px', fontWeight: 500, fontFamily: 'Poppins', color: '#0069BD'}}>Note: Plot the input value by dragging the pointer</p>
      <LineChartDC isEditable={isEditable} />
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px' }}>
      <Button
  variant="contained"
  onClick={handlePrevious}
  style={{
    backgroundColor: '#0069BD',
    borderRadius: '32px',
    color: '#fff',
    textTransform: 'none',
    fontFamily: 'Poppins',
    fontWeight: '400',
    // fontFamily: 'Poppins, sans-serif',
  }}
  startIcon={<ArrowBackIcon />}
>
  Previous
</Button>

<Button
  variant="contained"
  onClick={toggleEdit}
  style={{
    backgroundColor: '#0069BD',
    borderRadius: '32px',
    color: '#fff',
    textTransform: 'none',
    fontFamily: 'Poppins',
    fontWeight: '400',
    // fontFamily: 'Poppins, sans-serif',
  }}
  startIcon={isEditable ? <SaveIcon /> : <EditIcon />}
>
  {isEditable ? 'Save' : 'Edit'}
</Button>

<Button
  variant="contained"
  onClick={handleRun}
  style={{
    backgroundColor: '#0069BD',
    borderRadius: '32px',
    color: '#fff',
    textTransform: 'none',
    fontFamily: 'Poppins',
    fontWeight: '400',
    // fontFamily: 'Poppins, sans-serif',
  }}
  endIcon={<ArrowForwardIcon />}
>
  Run
</Button>

      </div>
    </div>
  );
};

export default DriveCycle;
