import React from 'react';
import ToggleButtonMui from './ToggleButtonMui';
import EfficiencyPlot2d from './EfficiencyPlot2d';
import EfficiencyPlot from './EfficiencyPlot';

const EfficiencyPlotMain = () => {
  return (
    <div>
        <ToggleButtonMui TwoDComponent={EfficiencyPlot2d} ThreeDComponent={EfficiencyPlot}/>
    </div>
  );
};

export default EfficiencyPlotMain;