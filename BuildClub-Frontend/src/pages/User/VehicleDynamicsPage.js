import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '../../assets/images/icons/vehicleParametersIcon.svg';
import GroupAddIcon from '../../assets/images/icons/performanceSpecsIcon.svg';
import VideoLabelIcon from '../../assets/images/icons/drivenCycleIcon.svg';
import CustomStepper from '../../components/Common/CustomStepper';
import VehicleParameters from '../../components/Common/VehicleDynamicsInput/VehicleParameters';
import PerformanceSpecs from '../../components/Common/VehicleDynamicsInput/PerformanceSpecs';
import DriveCycle from '../../components/Common/VehicleDynamicsInput/DriveCycle';

const steps = [
  { label: 'Vehicle Parameters', imgSrc: SettingsIcon },
  { label: 'Performance Specs', imgSrc: GroupAddIcon },
  { label: 'Drive Cycle', imgSrc: VideoLabelIcon },
];

const VehicleDynamicsPage = () => {
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
    navigate('/user/vehicle-dynamics-output'); // Navigate to Vehicle Dynamics Output page
  };

  const stepComponents = [
    <VehicleParameters handlePrevious={handlePrevious} handleNext={handleNext} />,
    <PerformanceSpecs handlePrevious={handlePrevious} handleNext={handleNext} />,
    <DriveCycle handlePrevious={handlePrevious} handleRun={handleRun} />,
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <CustomStepper 
        steps={steps} 
        stepComponents={stepComponents} 
        activeStep={activeStep} 
        onStepChange={handleStepChange}
        styles={{width: '48.611vw', alignSelf: 'center'}}
      />
    </div>
  );
};

export default VehicleDynamicsPage;
