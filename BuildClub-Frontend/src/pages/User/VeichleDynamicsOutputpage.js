
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import torqueSpeedIcon from '../../assets/images/icons/torqueSpeedIcon.svg';
import powerSpeedIcon from '../../assets/images/icons/powerSpeedIcon.svg';
import voltageSpecificationIcon from '../../assets/images/icons/voltageSpecificationIcon.svg';
import CustomStepper from '../../components/Common/CustomStepper';

import TorqueSpeed from '../../components/Common/VehicleDynamicsOutput/TorqueSpeed';
import PowerSpeed from '../../components/Common/VehicleDynamicsOutput/PowerSpeed';
import VoltageSpecification from '../../components/Common/VehicleDynamicsOutput/VoltageSpecification';

const steps = [
  { label: 'Torque Speed', imgSrc: torqueSpeedIcon },
  { label: 'Power Speed', imgSrc: powerSpeedIcon },
  { label: 'Voltage Specification', imgSrc: voltageSpecificationIcon },
];

const VeichleDynamicsOutputpage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isNextStepClickable, setIsNextStepClickable] = useState(true);

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

    navigate('/user/some-other-output'); 
  };

  const stepComponents = [
    <TorqueSpeed handlePrevious={handlePrevious} handleNext={handleNext} />,
    <PowerSpeed handlePrevious={handlePrevious} handleNext={handleNext} />,
    <VoltageSpecification handlePrevious={handlePrevious} handleRun={handleRun} />,
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2.389vh' }}>
      <CustomStepper 
        steps={steps} 
        stepComponents={stepComponents} 
        activeStep={activeStep} 
        onStepChange={handleStepChange}
        isNextStepClickable={isNextStepClickable}
        styles={{ width: '50.556vw', alignSelf: 'center' }}
      />
    </div>
  );
};

export default VeichleDynamicsOutputpage;
