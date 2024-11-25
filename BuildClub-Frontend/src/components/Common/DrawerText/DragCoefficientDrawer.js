import React from 'react';

const DragCoefficientDrawer = () => {
    return (
        <div className="slider-content">
            <p>
                This is a dimensionless parameter representing the drag force experienced by a 
                moving vehicle. It depends on the vehicle's shape, surface characteristics, and airflow patterns. Lower drag coefficients indicate better aerodynamic performance, while higher coefficients represent greater drag.
            </p>
            <p>For a 2-wheeler the drag coefficient is 0.5 – 1.1.</p>
            <p>For a four-wheeler the drag coefficient is as follows:</p>
            <ul>
                <li>Passenger car: 0.28–0.40</li>
                <li>Sports car: 0.20–0.40</li>
                <li>Small/Light van and MPV: 0.35–0.50</li>
                <li>Bus: 0.40–0.80</li>
            </ul>
        </div>
    );
}

export default DragCoefficientDrawer;
