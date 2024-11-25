import React from 'react';
import './Drawer.css';

const GearEfficiencyDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        The gear efficiency for various types of gears in the transmission of power are given as follows can be chosen as per the application.
      </p>

      <p><b>In Bikes:</b> In bikes Spur gears are used.</p>
      <p><b>In Cars:</b> In cars helical gears is used due to their high contact ratio and smooth transmission.</p>

      <table id="slider-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Type</th>
            <th>Normal Ratio Range</th>
            <th>Efficiency Range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Spur</td>
            <td>1:1 to 1:6</td>
            <td>94-98%</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Helical</td>
            <td>1:1.5 to 1:10</td>
            <td>94-98%</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default GearEfficiencyDrawer;
