import React from 'react';

const VoltagespecsparameterDrawer = () => {
  return (
    <div className="slider-content">
      {/* Content for Battery Voltage */}
      <h3 style={{ color: '#0069bd' }}>Voltage DC (V)</h3>
      <p>This is the battery voltage set by the user.</p>
      
      <h3 style={{ color: '#0069bd' }}>Current DC max (A)</h3>
      <p>
        Maximum current that the battery needs to supply for the time mentioned
        in the time to accelerate input box.
      </p>
      
      <h3 style={{ color: '#0069bd' }}>K<sub>e</sub> (V/Krpm)</h3>
      <p>
        In permanent magnet motors, the rotor generates its own magnetic field,
        inducing a voltage in the stator windings as it moves. This induced
        voltage, known as back-emf, increases linearly with speed and plays a
        vital role in determining the maximum operating speed of the motor. The
        Back emf constant, represented by Ke, quantifies the ratio of the voltage
        generated in the winding to the rotor speed. Typically measured when the
        rotor is at 1000 rpm, Ke is expressed in units of volts per kilorpm (Krpm).
      </p>
      
      <h3 style={{ color: '#0069bd' }}>K<sub>e</sub> (Vs/rad)</h3>
      <p>In this, the Ke value is represented in SI units.</p>
      
      <h3 style={{ color: '#0069bd' }}>K<sub>t</sub> (Nm/A<sub>rms</sub>)</h3>
      <p>
        Torque constant (Kt) is defined as the ratio of the motor's torque (T) to
        the current (I) flowing through its windings. It indicates how much torque
        the motor will generate for every unit of current applied to it. A higher
        torque constant means the motor will produce more torque for a given
        current, while a lower torque constant implies less torque output for the
        same current.
      </p>
      
      <h3 style={{ color: '#0069bd' }}>Max A<sub>rms</sub> (A)</h3>
      <p>
        Maximum current flowing through each switch of the hex inverter. The
        semiconductor should be decided to withstand this RMS current.
      </p>

      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default VoltagespecsparameterDrawer;
