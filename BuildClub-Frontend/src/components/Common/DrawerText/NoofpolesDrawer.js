import React from 'react';

const NoofpolesDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        The no. of poles is the number of permanent magnetic poles, north and south, on the rotor. 
        There is always the same number of north and south poles on the rotor. Thus, there are always an even number of poles.
      </p>
      <p>
        In general, a greater number of magnet poles usually reduces torque ‘ripple’ – the instantaneous fluctuations in torque 
        that could lead to the ride not feeling ‘smooth’. On the other hand, a greater number of poles leads to higher electric 
        frequency. This can pose challenges in control as well as lead to increased steel losses.
      </p>
      {/* Include your images, tables, etc. here */}
    </div>
  );
};

export default NoofpolesDrawer;
