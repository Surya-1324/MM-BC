import React from 'react';

const MagnetDrawer = () => {
    return (
        <div className="slider-content">
            <p>The designation N42 indicates that a sintered neodymium rare earth magnet 
                possesses a maximum energy product of 42 Mega Gauss Oersteds (MGOe), representing its 
                capacity for storing magnetic energy. This value is typically illustrated by the magnet's 
                Demagnetization Curve, also known as the BH Curve, where the maximum point is denoted 
                as (BH)max. In general, a higher grade indicates a stronger magnet.</p>
            <p>Different letters accompany the N42 grade to denote temperature ratings for 
                sintered neodymium rare earth magnets. Specifically, N42M signifies a temperature rating of 
                100℃, N42H indicates 120℃, N42SH denotes 150℃, and N42UH represents 180℃.</p>

            {/* Content for drag Coefficient */}
            {/* <h3>Rolling Resistance Coefficient </h3><br>
            <p>This is a dimensionless parameter representing the force opposing the motion of a 
                rolling vehicle. Big rolling resistance coefficients typically lead to increased energy 
                consumption.  </p>
            <p>Rolling resistance refers to the force that opposes the motion of a vehicle as its tires roll along a level 
                surface. It arises mainly due to the deformation of the tire, internal friction within the tire material, 
                and the interaction between the tire and the road surface. Rolling resistance consumes energy. </p>
                
                <table id="slider-table">
                    <caption>Battery Voltage Table</caption>
                    <thead>
                        <tr>
                            <th>Road surface* </th>
                            <th>Rolling resistance coefficient* </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pneumatic car tires on </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>large set pavement </td>
                            <td>0.013 </td>
                        </tr>
                        <tr>
                            <td>small set pavement </td>
                            <td>0.013 </td>
                        </tr>
                        <tr>
                            <td>concrete, asphalt  </td>
                            <td>0.011 </td>
                        </tr>
                        <tr>
                            <td>rolled gravel  </td>
                            <td>0.02 </td>
                        </tr>
                        <tr>
                            <td>Tar-Macadam </td>
                            <td>0.025  </td>
                        </tr>
                        <tr>
                            <td>unpaved road </td>
                            <td>0.05  </td>
                        </tr>
                        <tr>
                            <td>field  </td>
                            <td>0.1 – 0.35  </td>
                        </tr>
                        <tr>
                            <td>Pneumatic truck tires on </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>concrete, asphalt </td>
                            <td>0.006 – 0.01 </td>
                        </tr>
                        <tr>
                            <td>Strake wheels in field </td>
                            <td>0.14 – 0.24 </td>
                        </tr>
                        <tr>
                            <td>Track-type tractor in field </td>
                            <td>0.07 – 0.12 </td>
                        </tr>
                        <tr>
                            <td>Wheel on rail </td>
                            <td>0.001 – 0.002 </td>
                        </tr>
                        <tr>
                            <td>large set pavement </td>
                            <td>0.013 </td>
                        </tr>
                    Add more rows as needed */}
                {/* </tbody>
            </table>
            <p>Credit: <a href="https://x-engineer.org/rolling-resistance/#comment-1829">https://x-engineer.org/rolling-resistance/#comment-1829 </a></p> */}
            {/* <img src="./assets/images/Wheel Radius (m).png" alt="Battery Voltage Image" style="width: 100%; max-width: 500px;"> */}
        </div>
    );
}

export default MagnetDrawer;
