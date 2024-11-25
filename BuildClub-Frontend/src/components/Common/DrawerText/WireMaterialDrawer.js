import React from 'react';

const WireMaterialDrawer = () => {
    return (
        <div className="slider-content">
            <p>
                Copper exhibits superior conductivity, better resistance to corrosion, and higher
                mechanical strength. However, copper is heavier and more expensive than aluminum.
                Copper is often preferred for demanding applications that prioritize performance and
                reliability.
            </p>
            <p>
                Aluminum is lighter and generally more cost-effective than copper. While aluminum
                has lower conductivity resulting in more resistive loss, it remains a viable option for
                many applications, particularly those prioritizing cost and weight considerations.
            </p>
            {/* 
            <!-- Content for Battery Voltage -->
            <!-- <h3>Battery voltage DC (V)</h3><br>

            <ul> 
               <li>The battery voltage is often pre-decided by the vehicle manufacturer.  Else, it can be 
                chosen based on the availability of charging infrastructure. </li><br>
               <li>In case the controller is a bought-out item, then the voltage limit of the controller 
                defines the battery voltage that would be compatible with it.</li>
            </ul> --> 
            */}
            {/* Include your images, tables, etc. */}
        </div>
    );
};

export default WireMaterialDrawer;
