import React from 'react';

const PerformanceAnalysisDrawer = () => {
  return (
    <div className="slider-content">
      {/* Content for Battery Voltage */}
      <h3 style={{color: "#0069bd"}}>L<sub>d</sub> (μΗ) </h3>
      <p>
      Refers to the inductance associated with the winding along the d-axis, which is aligned with the rotor's magnetic field.
      </p>
      
      <h3 style={{color: "#0069bd"}}>L<sub>q</sub> (μΗ) </h3>
      <p>
      Refers to the inductance associated with the winding along the q-axis, which is orthogonal to the d-axis.
      </p>
      
      <h3 style={{color: "#0069bd"}}>Ψₘ (Magnetic Flux) (Wb) </h3>
      <p>
      Describes the magnetic flux in the stator windings due to the presence of the permanent magnet in the rotor.
      </p>

      <h3 style={{color: "#0069bd"}}>Kₑ (Back EMF Constant) (V/Krpm) </h3>
      <p>
      Refers to the voltage generated in the winding relative to the rotor speed. Typically measured when the rotor is at 1000 rpm, Kₑ is expressed in volts per kilorpm (Krpm).
      </p>

      <h3 style={{color: "#0069bd"}}> Kₜ (Torque Constant) (Nm/A) </h3>
      <p>
      Refers to the ratio of the motor's torque (T) to the current (I) flowing through its windings. It indicates how much torque the motor will generate for each unit of current applied.
      </p>

      <h3 style={{color: "#0069bd"}}>Max A_rms (A) </h3>
      <p>
      Refers to the maximum current required to achieve the maximum torque attainable by the motor
      </p>
      
      {/* Include your images, tables, etc. */}
    </div>
  );
};

export default PerformanceAnalysisDrawer;