import React from 'react';
import ToggleButtonMui from './ToggleButtonMui';
import WindingTemperaturePlot2d from './WindingTemperaturePlot2d';
import WindingTemperaturePlot from './WindingTemperaturePlot';

const WindingTemperaturePlotMain = () => {
  return (
    <div>
        <ToggleButtonMui TwoDComponent={WindingTemperaturePlot2d} ThreeDComponent={WindingTemperaturePlot}/>
    </div>
  );
};

export default WindingTemperaturePlotMain;