import React from 'react';

// import all the necessary images for this component here 
import wheelRadiusImage from '../../../assets/images/icons/wheelRadiusImage.png';

const wheelRadiusDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        This refers to the “rolling radius” of the wheel – the distance from the center of the
        wheel to its point of contact with the road. However, tire manufacturers specify this in the
        form of a riddle that has to be uncovered to arrive at this number, as given in the below
        example:
      </p>
      <p>
        Example: Calculate the wheel diameter [mm], and radius [mm] for the tire with the size
        marking <b>225/55R17</b>.
      </p>
      <img
        src={wheelRadiusImage}
        alt="Wheel Radius"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <p>
        Credit: <a href="https://x-engineer.org/calculate-wheel-radius/">https://x-engineer.org/calculate-wheel-radius/</a>
      </p>
      <p><b>Step 1.</b> Write down the known parameters and convert rim diameters from inch in mm.</p>
      <p>Width, W = 225 mm</p>
      <p>Aspect Ratio, AR = 55 %</p>
      <p>D = 17 in = 17 × 25.4 = 431.8 mm</p>
      <br />
      <p><b>Step 2.</b> Calculate the tire sidewall height.</p>
      <p>H = (AR × W) / 100 = 55 × 225 / 100 = 123.75 mm</p>
      <br />
      <p><b>Step 3.</b> Calculate the wheel diameter.</p>
      <p>dw = D + (2 × H) = 431.8 + 2 × 123.75 = 679.3 mm</p>
      <br />
      <p><b>Step 4.</b> Calculate the wheel radius.</p>
      <p>rw = dw / 2 = 679.3 / 2 = 339.65 mm = 0.339 m</p>
      <br /><br />
      <p>
        A bigger wheel radius increases the torque demand on the motor but enables the motor to run
        slower – and vice-versa. However, the choice of the wheel is primarily determined by the type
        of vehicle and the kind of terrain it is expected to operate in.
      </p>
      <p>
        For motorcycles or bicycles, the wheel radius is typically about 10 inches (25 cm), depending
        on the size and type of the vehicle. For cars, the wheel radius is typically about 12 inches (30 cm).
      </p>
    </div>
  );
};

export default wheelRadiusDrawer;
