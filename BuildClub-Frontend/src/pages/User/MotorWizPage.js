import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import topologyIcon from '../../assets/images/icons/topologyIcon.svg';
import materialIcon from '../../assets/images/icons/materialIcon.svg';
import geametryIcon from '../../assets/images/icons/geametryIcon.svg';
import thermalIcon from '../../assets/images/icons/thermalIcon.svg';
import Topology from '../../components/Common/MotorWizInput/Topology';
import Material from '../../components/Common/MotorWizInput/Material';
import Geometry from '../../components/Common/MotorWizInput/Geometry';
import Thermal from '../../components/Common/MotorWizInput/Thermal';

// Define your steps and their corresponding icons and components
const steps = [
  { label: 'Topology', imgSrc: topologyIcon },
  { label: 'Material', imgSrc: materialIcon },
  { label: 'Geometry', imgSrc: geametryIcon },
  { label: 'Thermal', imgSrc: thermalIcon },
];

const MotorWizPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const navigate = useNavigate();
  
  const handleRun = () => {
    setActiveStep(1); // Move to the Vehicle Dynamics step
    navigate('/user/motor-wiz-output'); // Navigate to Vehicle Dynamics Output page
  };

  const stepComponents = [
    <Topology handlePrevious={handlePrevious} handleNext={handleNext} />,
    <Material handlePrevious={handlePrevious} handleNext={handleNext} />,
    <Geometry handlePrevious={handlePrevious} handleNext={handleNext} />,
    <Thermal handlePrevious={handlePrevious} handleRun={handleRun} />,
  ];

  useEffect(() => {
    console.log('activeStep updated in MotorWizPage:', activeStep);
  }, [activeStep]);

  return (
    <div>
      hello world
    </div>
  );
};

export default MotorWizPage;
