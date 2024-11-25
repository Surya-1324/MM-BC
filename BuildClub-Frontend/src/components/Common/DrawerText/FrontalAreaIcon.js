import React from 'react';

import frontalAreaImage from '../../../assets/images/icons/frontalAreaImage.png';
const FrontalAreaDrawer = () => {
    return (
        <div className="slider-content">
            <p>
                It is the projected area of the vehicle's front surface as viewed from the direction of
                air motion, influencing air resistance and aerodynamic drag. A larger frontal area creates more resistance to airflow, resulting in higher aerodynamic drag.
            </p>
            <img
        src={frontalAreaImage}
        alt="Wheel Radius"
        style={{ width: '100%', maxWidth: '500px' }}
      />
            <br /><br />
            <p>
                Credit: <a href="https://sist.sathyabama.ac.in/sist_coursematerial/uploads/SAU1601.pdf">https://sist.sathyabama.ac.in/sist_coursematerial/uploads/SAU1601.pdf</a>
            </p>
        </div>
    );
};

export default FrontalAreaDrawer;
