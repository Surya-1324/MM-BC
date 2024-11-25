import React from 'react';
import Button from '@mui/material/Button';

const StepperControl = ({ activeStep, setActiveStep }) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mt: 1, mr: 1 }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ mt: 1, mr: 1 }}
      >
        {activeStep === 3 ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};

export default StepperControl;
