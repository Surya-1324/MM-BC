import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MotorLogTable from "../../components/Common/MotorLogTable.js";
import Loading from '../../components/Common/loading'; 
const MotorLogPage = ({ setActiveStep }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleMotorClick = (motor, step) => {
    setActiveStep(step); // Move to the appropriate step based on the click
    console.log("Selected motor:", motor);
    setLoading(true);
    navigate('/user/motor-wiz'); // Navigate to Motor Wiz page
    setLoading(true);
  };

  return (
    <div>
      <MotorLogTable 
        onMotorNameClick={(motor) => handleMotorClick(motor, 0)} 
        onMotorDescriptionClick={(motor) => handleMotorClick(motor, 1)} 
      />
    </div>
  );
};

export default MotorLogPage;
