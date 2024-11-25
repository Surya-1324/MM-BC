import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import geometryWOIcon from '../../assets/images/icons/geometryWOIcon.svg';
import windingDiagramWOIcon from '../../assets/images/icons/windingDiagramWOIcon.svg';
import fluxDensityPlotWOIcon from '../../assets/images/icons/fluxDensityPlotWOIcon.svg';
import airGapFluxWOIcon from '../../assets/images/icons/airGapFluxWOIcon.svg';
import PerformanceAnalysisWOIcon from '../../assets/images/icons/PerformanceAnalysisWOIcon.svg';
import costWeightWOIcon from '../../assets/images/icons/costWeightWOIcon.svg';
import CustomStepper from '../../components/Common/CustomStepper';

import TorqueSpeed from '../../components/Common/VehicleDynamicsOutput/TorqueSpeed';
import PowerSpeed from '../../components/Common/VehicleDynamicsOutput/PowerSpeed';
import VoltageSpecification from '../../components/Common/VehicleDynamicsOutput/VoltageSpecification';


import Geometry from '../../components/Common/MotorWizOutput/Geometry';
import WindingDiagram from '../../components/Common/MotorWizOutput/WindingDiagram';
import FluxDensityPlot from '../../components/Common/MotorWizOutput/FluxDensityPlot';
import AirGapFlux from '../../components/Common/MotorWizOutput/AirGapFlux';
import PerformanceAnalysis from '../../components/Common/MotorWizOutput/PerformanceAnalysis';
import CostWeight from '../../components/Common/MotorWizOutput/CostWeight';

import torqueSpeedIcon from '../../assets/images/icons/torqueSpeedIcon.svg';
import powerSpeedIcon from '../../assets/images/icons/powerSpeedIcon.svg';
import voltageSpecificationIcon from '../../assets/images/icons/voltageSpecificationIcon.svg';

const steps = [
  { label: 'Torque Speed', imgSrc: torqueSpeedIcon },
  { label: 'Power Speed', imgSrc: powerSpeedIcon },
  { label: 'Voltage Specification', imgSrc: voltageSpecificationIcon },
  { label: 'Geometry', imgSrc: geometryWOIcon },
  { label: 'Winding Diagram', imgSrc: windingDiagramWOIcon },
  { label: 'Flux Density Plot', imgSrc: fluxDensityPlotWOIcon },
  { label: 'Air Gap Flux', imgSrc: airGapFluxWOIcon },
  { label: 'Performance Analysis', imgSrc: PerformanceAnalysisWOIcon },
  { label: 'Cost & Weight', imgSrc: costWeightWOIcon },
];

const MotorWizPageOutput = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isNextStepClickable,seiIsNextStepClickable ] = useState(true);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const navigate = useNavigate();

  const handleRun = () => {
    setActiveStep(3); // Move to the Vehicle Dynamics step
    navigate('/user/vehicle-dynamics-output'); 
  };

  const stepComponents = [
    <TorqueSpeed handlePrevious={handlePrevious} handleNext={handleNext} />,
    <PowerSpeed handlePrevious={handlePrevious} handleNext={handleNext} />,
    <VoltageSpecification handlePrevious={handlePrevious} handleNext={handleNext} />,
    <Geometry handlePrevious={handlePrevious} handleNext={handleNext} />,
    <WindingDiagram handlePrevious={handlePrevious} handleNext={handleNext} />,
    <FluxDensityPlot handlePrevious={handlePrevious} handleNext={handleNext} />,
    <AirGapFlux handlePrevious={handlePrevious} handleNext={handleNext} />,
    <PerformanceAnalysis handlePrevious={handlePrevious} handleNext={handleNext} />,
    <CostWeight handlePrevious={handlePrevious} handleRun={handleRun} />,
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1.389vh' }}>
      <CustomStepper 
        steps={steps} 
        stepComponents={stepComponents} 
        activeStep={activeStep} 
        onStepChange={handleStepChange}
        isNextStepClickable={isNextStepClickable}
        styles={{width: '75.556vw', alignSelf: 'center' }}
      />
    </div>
  );
};

export default MotorWizPageOutput;
