import React from 'react';
import TopologyImage from '../../../assets/images/icons/TopologyImage.png';
const TopologyComponentDrawer = () => {
  return (
    <div className="slider-content">
      <img
        src={TopologyImage}
        alt="Wheel Radius"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <p>Credit: 
        <a href="https://enmotor.com/what-is-the-difference-between-ipm-and-spm-motor/">
          https://enmotor.com/what-is-the-difference-between-ipm-and-spm-motor/
        </a>
      </p>
      <p>Permanent magnet motors (also known as PMs) can be divided into two main categories:</p>
      <ol type="a">
        <li>Interior Permanent Magnet (IPM) is a motor with permanent magnets embedded in the rotor.</li>
        <li>Surface Permanent Magnet (SPM) is a motor with permanent magnets attached to the circumference of the rotor.</li>
      </ol>
      <p>Both types generate magnetic flux through permanent magnets fixed to or inside the rotor.</p>
      <p>In SPM motors, because of their mechanical mounting, mechanical strength is weaker than that of IPM motors. The weakened mechanical strength limits the motor’s maximum safe mechanical speed. SPM motors rely heavily on magnetic torque components to generate torque.</p>
      <p>In IPM motors, the location of the permanent magnets makes IPM motors very mechanically sound, and suitable for operating at very high speeds. The IPM motor can generate torque by utilizing the magnetic torque and reluctance torque components of the motor. IPM motor’s performance can be further manipulated using a technique called field weakening. For applications demanding high speeds, such as traction motors, interior permanent magnet motors emerge as the optimal choice.</p>
    </div>
  );
};

export default TopologyComponentDrawer;
