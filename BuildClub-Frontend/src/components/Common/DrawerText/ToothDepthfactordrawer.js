import React from 'react';
import toothDepthFactorImage from '../../../assets/images/icons/ToothDepthFactorImage.png';

const ToothDepthFactorDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        It is the ratio of tooth (or Slot) depth (d) to the mean air gap radius (rg). Nominal
        value is between 0.43 and 0.67.
      </p>
      <img
        src={toothDepthFactorImage}
        alt="Tooth Depth Factor"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default ToothDepthFactorDrawer;
