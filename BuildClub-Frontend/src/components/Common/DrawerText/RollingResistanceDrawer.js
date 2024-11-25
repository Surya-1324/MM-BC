import React from 'react';
import './Drawer.css';

const RollingResistanceDrawer = () => {
    return (
        <div className="slider-content">
            <p>Dimensionless parameter representing the force opposing the motion of a rolling vehicle. Big rolling resistance coefficients typically lead to increased energy consumption. Rolling resistance refers to the force that opposes the motion of a vehicle as its tires roll along a level surface. It arises mainly due to the deformation of the tire, internal friction within the tire material, and the interaction between the tire and the road surface. Rolling resistance consumes energy.</p>

            <table id="slider-table">
                <thead>
                    <tr>
                        <th>Road surface*</th>
                        <th>Rolling resistance coefficient*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pneumatic car tires on</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>large set pavement</td>
                        <td>0.013</td>
                    </tr>
                    <tr>
                        <td>small set pavement</td>
                        <td>0.013</td>
                    </tr>
                    <tr>
                        <td>concrete, asphalt</td>
                        <td>0.011</td>
                    </tr>
                    <tr>
                        <td>rolled gravel</td>
                        <td>0.02</td>
                    </tr>
                    <tr>
                        <td>Tar-Macadam</td>
                        <td>0.025</td>
                    </tr>
                    <tr>
                        <td>unpaved road</td>
                        <td>0.05</td>
                    </tr>
                    <tr>
                        <td>field</td>
                        <td>0.1 – 0.35</td>
                    </tr>
                    <tr>
                        <td>Pneumatic truck tires on</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>concrete, asphalt</td>
                        <td>0.006 – 0.01</td>
                    </tr>
                    <tr>
                        <td>Strake wheels in field</td>
                        <td>0.14 – 0.24</td>
                    </tr>
                    <tr>
                        <td>Track-type tractor in field</td>
                        <td>0.07 – 0.12</td>
                    </tr>
                    <tr>
                        <td>Wheel on rail</td>
                        <td>0.001 – 0.002</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <p>Credit: <a href="https://x-engineer.org/rolling-resistance/#comment-1829">https://x-engineer.org/rolling-resistance/#comment-1829</a></p>
        </div>
    );
};

export default RollingResistanceDrawer;
