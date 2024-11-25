import React, { act } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CustomStepIconOutput from './CustomStepIcon';
import './CustomStepper.css';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: '1.7vw',
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: '2px dashed',
    borderColor: '#0069BD',
    borderRadius: 1,
    opacity: 0.5,
    backgroundColor: 'transparent',
    
  },
}));


const CustomStepperOutput = ({ steps, stepComponents, activeStep, onStepChange, isNextStepClickable, styles }) => {
  const handleStepClick = (index) => {
    if (index >= activeStep || isNextStepClickable) {
      onStepChange(index);
    }
  };


  return (
    <Stack sx={{ width: '100%' }} spacing={4} >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{...styles}}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
           
              StepIconComponent={(props) => (
                <CustomStepIconOutput {...props} icon={step.imgSrc} />
              )}
              onClick={() => handleStepClick(index)}
              style={{
                cursor: 'pointer',
              }}
  
              className={`stepLabel ${index === activeStep ? 'active' : 'inactive'}`}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {stepComponents[activeStep]}
      </div>
    </Stack>
  );
};


CustomStepperOutput.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
  stepComponents: PropTypes.arrayOf(PropTypes.node).isRequired,
  activeStep: PropTypes.number.isRequired,
  onStepChange: PropTypes.func.isRequired,
  
};


export default CustomStepperOutput;