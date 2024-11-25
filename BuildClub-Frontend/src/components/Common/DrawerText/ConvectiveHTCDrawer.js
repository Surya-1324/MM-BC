import React from 'react';
import ConvectiveHTCImage from '../../../assets/images/icons/ConvectiveHTCImage.png';
const ConvectiveHTCDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        The convective heat transfer coefficient, h, can be defined as the rate of heat transfer 
        between a solid surface (motor housing) and a fluid (such as air) per unit surface area per unit 
        temperature difference. When the fluid is static, it is called ‘natural’ convection; if the fluid is 
        forced to flow past the hot surface with a certain velocity, it is called ‘forced’ convection.
      </p>
      <img
        src={ConvectiveHTCImage}
        alt="Convective HTC"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <p>
        Credit: <a href="https://toppr.com/guides/physics/thermodynamics/heat-transfer-convection/">
          https://toppr.com/guides/physics/thermodynamics/heat-transfer-convection/
        </a>
      </p>
      <p>
        In <b>natural convection</b>, the motion of the fluid is driven solely by buoyancy 
        forces due to temperature variations, leading to a natural circulation of the 
        fluid. For natural, take h = <b>10</b> (W/m<sup>2</sup>K)
      </p>
      <p>
        <b>Forced convection</b>, on the other hand, involves the use of external mechanisms, 
        such as pumps or fans, to induce fluid motion and enhance heat transfer. For 
        forced convection:
      </p>
      <ol type="a">
        <li>with air take h = 25 to 40 (W/m<sup>2</sup>K)</li>
        <li>with water and liquids take h = 50 - 10000 (W/m<sup>2</sup>K)</li>
      </ol>
    </div>
  );
};

export default ConvectiveHTCDrawer;
