import React from 'react';

const GrossVehicleWeightDrawer = () => {
  return (
    <div className="slider-content">
      <p>Gross Vehicle Weight (GVW) is the total weight of a vehicle when fully loaded with passengers, cargo, and fluids.</p>
      <p>It is the “total” weight of the vehicle, which includes the kerb weight and the payload.</p>
      <p>Kerb weight: This is the bare vehicle weight including that of its power-train (motor, batteries etc.)</p>
      <p>Payload: This includes the maximum weight of passengers and cargo that the vehicle is designed to carry.</p>
      <p>In the case of a 2-wheeler, the kerb weight is around 100-200 kgs. The payload includes the total weight of two passengers and luggage – usually estimated at 160Kg.</p>
      <p>In the case of a 4-wheeler, the kerb weight can be chosen in the following range depending upon the application in addition to the weight of the passengers.</p>
      <ul>
        <li>Subcompact cars: 1,000 kg - 1,500 kgs</li>
        <li>Compact cars: 1,200 kg - 1,800 kgs</li>
        <li>Midsize sedans: 1,400 kg - 2,000 kgs</li>
        <li>SUVs and crossovers: 1,500 kg - 2,500 kgs depending on size and purpose.</li>
      </ul>
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default GrossVehicleWeightDrawer;
