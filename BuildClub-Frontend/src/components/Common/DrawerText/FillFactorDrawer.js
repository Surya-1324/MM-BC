import React from 'react';
import wheelRadiusImage from '../../../assets/images/icons/FillFactorImage.png';
const FillFactorDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        It is a measure of how much copper is packed into the stator slot. A higher fill factor
        reduces the wire resistance, and hence the copper loss. This reduces the temperature rise
        during operation.
      </p>
      <img
        src={wheelRadiusImage}
        alt="Wheel Radius"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <br />
      <br />
      <p>
        Credit: <a href="https://www.emetor.com/glossary/slot-fill-factor/">https://www.emetor.com/glossary/slot-fill-factor/</a>
      </p>
      <p>
        <b>For example,</b> a fill factor of 40% would signify that 40% of the slot area is occupied
        by the conductors, the rest of the slot area being occupied by conductor insulation, slot
        insulation, and inevitable gaps in between the conductors and between the conductors and
        the slot sides.
      </p>
    </div>
  );
};

export default FillFactorDrawer;
