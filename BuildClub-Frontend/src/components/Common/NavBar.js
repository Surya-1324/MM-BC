import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import VehicleParameters from './VehicleParameters';
import PerformanceSpecs from './PerformanceSpecs';
import DrivenCycle from './DrivenCycle';

// Styled components
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#0069BD',
      borderWidth: 2,
      borderStyle: 'solid',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#0069BD',
      borderWidth: 2,
      borderStyle: 'solid',
    },
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

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed || ownerState.active
    ? '#0069BD'
    : 'rgba(127, 180, 222, 1)', // 50% opacity color
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #0069BD 0%, #0069BD 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(136deg, #0069BD 0%, #0069BD 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['Vehicle Parameters', 'Performance Specs', 'Driven Cycle'];

// Individual components for each step
const Step1Component = () => <VehicleParameters/>;
const Step2Component = () => <PerformanceSpecs/>;
const Step3Component = () => <DrivenCycle/>;

export default function CustomizedStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  // Step content mapping
  const stepComponents = [<Step1Component />, <Step2Component />, <Step3Component />];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)}>
            <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {stepComponents[activeStep]}
      </div>
    </Stack>
  );
}
