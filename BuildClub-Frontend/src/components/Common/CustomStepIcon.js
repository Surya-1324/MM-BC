import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const ColorlibStepIconRoot = styled('div')(({ ownerState }) => ({
  backgroundColor: ownerState.active ? '#0069BD' : '#FFFFFF',
  border: ownerState.active ? 'none' : '2px solid rgba(0, 105, 189, 0.5)',
  zIndex: 1,
  color: '#0069BD',
  width: '4vw',
  height: '4vw',
  maxWidth: '50px',
  maxHeight: '50px',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #0069BD 0%, #0069BD 100%)',
    boxShadow: '0 4px 5px 0 rgba(0,0,0,.25)',
  }),
}));

function CustomStepIcon(props) {
  
  const { active, className, icon } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ active }} className={className}>
      <img 
        src={icon} 
        alt="step icon" 
        style={{ 
          width: '60%', 
          height: '60%', 
          marginLeft: '0.28vw' ,
          objectFit: 'contain',
          filter: active ? 'none' : 'invert(34%) sepia(99%) saturate(558%) hue-rotate(172deg) brightness(92%) contrast(90%) opacity(100%)',
        }} 
      />
    </ColorlibStepIconRoot>
  );
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default CustomStepIcon;
