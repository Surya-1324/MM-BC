import React from 'react';
import GeometryImage from '../../../assets/images/icons/GeometryImage.svg';
const GeometryDrawer = () => {
  return (
    <div className="slider-content">
      

      <h3 style={{color: "#0069bd"}}> Geometry Parameter </h3>
     
      <img
        src={GeometryImage}
        alt="Geometry Image"
        style={{ width: '100%', maxWidth: '500px' }}
      />

    
     <h3 style={{color: "#0069bd"}}> Stack Length (mm) </h3>
      
      <p>
      Refers to the length of the laminated steel core of the stator or rotor. This stack is made up of thin sheets, called laminations, which are stacked together to form the core. These laminations reduce eddy current losses and help improve the motor's efficiency.
      </p>
      <h3 style={{color: "#0069bd"}}> Magnet Dimensions (mm) </h3>
      <p>
      Magnet dimensions refer to the size and shape of the permanent magnets used in the motor’s rotor or stator. These magnets are essential for generating the magnetic fields that interact with the coil windings to produce torque and mechanical motion. Magnet dimensions are critical because they influence the motor's performance, efficiency, and power output.
      </p>
    </div>
  );
};

export default GeometryDrawer;