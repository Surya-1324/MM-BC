import React from 'react';

const DrivecycleDrawer = () => {
  return (
    <div className="slider-content">
      {/* Content for Battery Voltage */}
      <h3>Drive Cycle Performance</h3>
      <p>
        Indian Driving Cycle (IDC) is developed by ARAI (Automotive Research Association of India) 
        is designed to represent typical driving conditions in India. It consists of a series of 
        driving patterns that represent urban driving conditions typically encountered in Indian 
        cities. The IDC includes various driving modes such as idling, acceleration, deceleration, 
        cruising, and stops, with specific speed profiles and durations for each mode. The cycle 
        is designed to replicate the stop-and-go traffic, congested roads, and varying speeds 
        commonly seen in Indian urban environments.
      </p>
      
      <h3>Average Motor Operating Point</h3>
      <p>
        It is an average operating condition of the motor over the entire drive cycle.
      </p>
      
      <h3>Average Vehicle Operating Point</h3>
      <p>
        Vehicle Operating Point broadens our analysis beyond the electric motor to the entire 
        vehicle. This gives us a complete view of how the vehicle performs under the motor 
        operating point.
      </p>
      
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default DrivecycleDrawer;
