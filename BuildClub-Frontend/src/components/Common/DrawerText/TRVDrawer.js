import React from 'react';

const TRVDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        Torque-per-rotor-volume is limited to 0.1 Nm/cc for rare-earth magnets. It offers a 
        common basis for comparing motors and for initial motor sizing for a given application. For 
        improved thermal performance, significantly lower values may be chosen.
      </p>
      {/* Uncomment and update the path to your image if needed */}
      {/* <img src="./assets/images/Wheel Radius (m).png" alt="Battery Voltage Image" style={{ width: '100%', maxWidth: '500px' }} /> */}
    </div>
  );
};

export default TRVDrawer;
