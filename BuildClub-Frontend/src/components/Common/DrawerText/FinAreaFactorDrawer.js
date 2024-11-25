import React from 'react';
import './Drawer.css'; // Assuming you have a CSS file for styling
import FinAreaFactorImage from '../../../assets/images/icons/FinAreaFactorImage.png';
const FinAreaFactorDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        A dimensionless parameter used to quantify the surface area of a fin for enhancing the heat transfer process. Fins are used to increase the effective area of the housing that is exposed to air – thereby improving the rate of heat transfer. The extent to which the area is amplified due to the presence of fins is defined by the fin-area factor.
      </p>
      <img
        src={FinAreaFactorImage}
        alt="Fin Area Factor"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <br />
      <br />
      <p>
        The fin area factor tells how much area is outside (Aout) compared to inside (Ain). A higher number means there's more fin area, which leads to more heat transfer. The nominal value of this factor is between 1 and 4. A value higher than 4 could obstruct airflow and decrease the heat transfer.
      </p>
    </div>
  );
};

export default FinAreaFactorDrawer;
