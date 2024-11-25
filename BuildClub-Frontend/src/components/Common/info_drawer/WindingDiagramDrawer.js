import React from 'react';
import  ThreePhaseWindingDiagramImage from '../../../assets/images/icons/3PhaseDiagram.png';
// import  UPhaseImage from '../../../assets/images/icons/U-Phase.png';
// import  VPhaseImage from '../../../assets/images/icons/V-Phase.png';
// import  WPhaseImage from '../../../assets/images/icons/W-Phase.png';
const WindingDiagramDrawer = () => {
  return (
    <div className="slider-content">
      {/* Content for Battery Voltage */}


      <h3 style={{color: "#0069bd"}}> 3 – Phase Winding Diagram </h3>
     
     <img
       src={ThreePhaseWindingDiagramImage}
       alt="3-Phase Diagram Image"
       style={{ width: '100%', maxWidth: '500px' }}
     />


{/* <h3 style={{color: "#0069bd"}}> U - Phase </h3>
     
     <img
       src={UPhaseImage}
       alt="U-Phase Image"
       style={{ width: '100%', maxWidth: '500px' }}
     />


<h3 style={{color: "#0069bd"}}> V-Phase </h3>
     
     <img
       src={VPhaseImage}
       alt="V-Phase Image"
       style={{ width: '100%', maxWidth: '500px' }}
     />


<h3 style={{color: "#0069bd"}}> W - Phase </h3>
     
     <img
       src={WPhaseImage}
       alt="W-Phase Image"
       style={{ width: '100%', maxWidth: '500px' }}
     /> */}


      <h3 style={{color: "#0069bd"}}>Turns Per Slot</h3>
      <p>
      Refers to the number of times the wire is wound around the stator’s slot.
      </p>
     
      <h3 style={{color: "#0069bd"}}>Parallel Strands</h3>
      <p>
      Refers to the use of multiple wires within a winding. This configuration increases the effective cross-sectional area of the conductor, thereby reducing the overall electrical resistance.
      </p>
     
      <h3 style={{color: "#0069bd"}}>Wire Gauge</h3>
      <p>
      Refers to the standardized measurement system (SWG – Standard Wire Gauge) for the diameter of electrical wire. A lower gauge number indicates a thicker wire, while a higher number indicates a thinner wire.
      </p>


      <h3 style={{color: "#0069bd"}}>Fill Factor (%)</h3>
      <p>
      Refers to the measure of how much copper is packed into the stator slot. A higher fill factor reduces the wire resistance, thereby reducing copper losses.
      </p>


      <h3 style={{color: "#0069bd"}}>Phase Resistance (mΩ)</h3>
      <p>
      Refers to the electrical resistance experienced by the current flowing through an individual phase of the motor winding.
      </p>
     
      {/* Include your images, tables, etc. */}
    </div>
  );
};


export default WindingDiagramDrawer;