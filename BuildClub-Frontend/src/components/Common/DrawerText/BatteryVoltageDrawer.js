import React from 'react';

const BatteryVoltageDrawer = () => {
  return (
    <div className="slider-content">
      <ul>
        <li>
          The battery voltage is often pre-decided by the vehicle manufacturer. Else, it can be
          chosen based on the availability of charging infrastructure.
        </li>
        <br />
        <li>
          In case the controller is a bought-out item, then the voltage limit of the controller
          defines the battery voltage that would be compatible with it.
        </li>
      </ul>
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default BatteryVoltageDrawer;
