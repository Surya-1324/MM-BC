import React from 'react';

const AirgapDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        It is the distance between the rotor and the stator, where magnetic fluxes interact, 
        and torque is produced. In motors, flux passes between the rotor and stator through an air 
        gap. Optimum value is around 0.5 to 1mm.
      </p>
      <ol type="a">
        <li>
          A short airgap length maximizes the flux for a given thickness of magnet, but it 
          requires closer mechanical tolerances.
        </li>
        <li>
          A large airgap length increases the rotor-stator alignment tolerances, making it 
          easier to manufacture. However, it leads to a weaker magnetic circuit and will 
          reduce the efficiency of the motor.
        </li>
      </ol>
      <p>
        It is good to choose as small an airgap as manufacturing tolerances allow.
      </p>
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default AirgapDrawer;
