import React from 'react';

const NoofSlotsDrawer = () => {
    return (
        <div className="slider-content">
            <p>
                The internal circumference of the stator includes grooves in specified intervals, known as ‘slots’ that channel copper windings. When an electric current passes through the windings, a series of magnetic fields is created. It’s the interaction between these magnetic fields and the magnets on the rotor (the central rotating part of the motor) that generates rotational motion.
            </p>
            <p>
                The number of slots, in combination with the number of poles, defines the winding patterns that are optimal for the design. The slots have to be equally allocated across all the phases of the windings, for the pattern to be ‘balanced’. Thus for a three-phase motor, the number of slots is always a multiple of 3.
            </p>
            {/* Uncomment and replace the src attribute with the correct path to include the image */}
            {/* <img src="./assets/images/Wheel Radius (m).png" alt="Battery Voltage Image" style={{ width: '100%', maxWidth: '500px' }} /> */}
        </div>
    );
}

export default NoofSlotsDrawer;
