import React from 'react';

const TorquespeedDrawer = () => {
  return (
    <div className="slider-content">
      {/* Content for Battery Voltage */}
      <h3 style={{ color: '#0069bd' }}>Peak Torque (Nm)</h3>
      <p>
        The highest torque output that the motor can deliver for a temporary period. 
        This torque is needed by a vehicle from rest till a speed of about 10 Kmph only – to climb out of a steep ramp.
      </p> 
      
      <h3 style={{ color: '#0069bd' }}>Peak Power (kW)</h3>
      <p>
        It represents the maximum power output that the motor can achieve for a temporary period. 
        This is needed when the vehicle accelerates from rest to a high speed, or when it is overtaking another reasonably fast-moving vehicle.
      </p> 
      
      <h3 style={{ color: '#0069bd' }}>Peak Speed (RPM)</h3>
      <p>
        It refers to the maximum speed that the motor can reach on a level road.
      </p>
      
      <h3 style={{ color: '#0069bd' }}>No Load Speed (RPM)</h3>
      <p>
        This is the highest speed at which the motor runs when there is no external load applied to it.
      </p>
      
      <h3 style={{ color: '#0069bd' }}>Rated Speed (RPM)</h3>
      <p>
        It refers to the maximum speed that the motor can sustain on a long uphill drive when it is called upon to deliver its “rated” torque.
      </p>
      
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default TorquespeedDrawer;
