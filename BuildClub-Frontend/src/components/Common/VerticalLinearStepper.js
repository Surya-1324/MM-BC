import React, { useEffect , useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';


import MotorLog from '../../assets/images/icons/motorLogIcon.svg';
import MotorWiz from '../../assets/images/icons/motorWizIcon.svg';


const steps = [
  {
    label: 'Motor Log',
    imgSrc: MotorLog,
    path: '/user/motor-log',
    style: {
     
      letterSpacing: '0.01071em',
      padding: '0.95vh 0.95vh',
      cursor: 'pointer',
      transition: 'background-color 0.3s, border-radius 0.3s, color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  {
    label: 'Motor Wiz',
    imgSrc: MotorWiz,
    path: '/user/motor-wiz',
    style: {
     
      letterSpacing: '0.01071em',
      padding: '0.95vh 0.95vh',
      cursor: 'pointer',
      transition: 'background-color 0.3s, border-radius 0.3s, color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
];


const StepIcon = ({ imgSrc, label, active, completed }) => {
  const opacity = active || completed ? '1' : '0.5';

  return (
    <img
      src={imgSrc}
      alt=""
      style={{
        opacity,
        width: '1.6667vw',
        height: '2.3438vh',
        minWidth: '16px',
        maxWidth: '32px',
        minHeight: '16px',
        maxHeight: '32px',
      }}
    />
  );
};

const StyledStepper = styled(Stepper)(({ theme,activeStepNEV }) => ({
  backgroundColor: '#EAF4FC',
  padding: '1.56vw',
  borderRadius: '10px',
  width: '16.40vw',
  '@media (max-width: 1024px) and (max-height: 768px)': {
    height: '21vh', // Increase height for 1024x768 screens
  },

  // Optional: Adjust for other screen sizes or resolutions
  '@media (min-width: 1025px) and (max-width: 1366px)': {
    height: '20vh', // Adjust for larger screens within the range
  },
  height: '24vh',
  margin: '2vh 0.85vw',

}));



const VerticalLinearStepper = ({ activeStepNEV, setActiveStepNEV,completed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  // Calculate opacity based on active step
  const getOpacityValue = (index) => {
    return activeStep >= index ? 1 : 0.5; // Full opacity if active or past step, otherwise lower
  };
// Update active step based on the current path
useEffect(() => {
  if (location.pathname === '/user/motor-log') {
    setActiveStepNEV(0); // Motor Log
  } else if (location.pathname === '/user/motor-wiz') {
    setActiveStepNEV(1); // Motor Wiz
  } else if (location.pathname === '/user/application') {
    setActiveStepNEV(0); // Set active step to Motor Log for application page
  }
}, [location.pathname, setActiveStepNEV]);

const handleStepClick = (index, path) => {
  // Prevent navigation to Motor Wiz if on Motor Log or Application Log page
  if (location.pathname === '/user/motor-log' || location.pathname === '/user/application-log') {
    if (index === 1) {
      return; // Prevent moving to Motor Wiz step
    }
  }

  // Only allow navigation to the next step if the current step has been completed
  if (index === 0 || index === activeStepNEV + 1) {
    setActiveStepNEV(index); // Set the active step state
    if (path) navigate(path); // Navigate to the specified path
  }
};
const isMotorLogPage = location.pathname === '/user/motor-log' || location.pathname === '/user/application-log';


  return (
    <Box>
      <StyledStepper activeStep={activeStepNEV} orientation="vertical"  sx={{
          '& .MuiStepConnector-line': {
            display: 'block',
            borderColor: '#0069bd',
            borderLeftStyle: 'solid',
            borderLeftWidth: '0.17vw',
            height: '6.5vh',
            margin: '0.9vw 0.09vw',
            opacity: activeStepNEV >= 1 ? 1 : 0.5,
          },
      }}>
        {steps.map((step, index) => (
         <Step key={step.label}>
         <StepLabel
           active={activeStepNEV === index} // Highlight if active
           completed= {activeStepNEV<=index}
           StepIconComponent={(props) => (
             <StepIcon {...props} imgSrc={step.imgSrc} label={step.label} active={activeStepNEV === index} />
           )}
           onClick={() => {
             if (index === 1 && isMotorLogPage) {
               // Prevent navigating to Motor Wiz if on Motor Log page
               return;
             }
             handleStepClick(index, step.path);
           }}
           sx={{
            ...step.style,
             backgroundColor: activeStepNEV === index ? '#D6EAF9' : 'transparent',
             borderRadius: activeStepNEV === index ? '4px' : '0',
             color: '#0069bd',
            
           }}
         >
          <span
      style={{
        fontFamily: '"Poppins", sans-serif',
        fontWeight: '500',
        opacity: activeStepNEV>=index ?1 :0.7, // Color for active step
        fontSize: 'clamp(9.95px, 0.972vw, 18.05px)', // Font size
        lineHeight: '1.43', // Line height
        letterSpacing: '0.01071em', // Letter spacing
        padding: '0.98vh 0.98vh', // Padding
        cursor: 'pointer', // Pointer cursor
        transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)', // Transition for color change
      }}
    >
      {step.label}
    </span>
         </StepLabel>
    
         <StepContent >
        
         </StepContent>
         
         
       </Step>
       
        ))}
      </StyledStepper>
    </Box>
  );
};

export default VerticalLinearStepper;
