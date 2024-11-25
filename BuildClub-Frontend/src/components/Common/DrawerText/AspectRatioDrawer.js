import React from 'react';
import wheelRadiusImage from '../../../assets/images/icons/AspectRatioImage.png';
import './Drawer.css'; // Import your CSS file if you have any styles

const AspectRatioDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        It is the ratio of mean air gap radius to the stack length of a motor. This value determines the 
        shape of the motor. A nominal value of 0.5 would result in a rotor whose diameter is equal 
        to its length.
      </p>
      <img
        src={wheelRadiusImage}
        alt="Wheel Radius"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <ol type="a">
        <li>
          A smaller ratio may be used where the motor must fit into a narrow space.
        </li>
        <br />
        <li>
          A larger ratio may reduce efficiency because it increases the ‘overhang’ length 
          of copper (in relation to its ‘active’ length). The overhang in the windings 
          produce copper loss but do not contribute to torque production.
        </li>
      </ol>
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default AspectRatioDrawer;
