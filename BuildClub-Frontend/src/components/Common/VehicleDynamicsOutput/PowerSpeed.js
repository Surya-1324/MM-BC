import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Plot from 'react-plotly.js';
import TorqueSpeedTable from './TorqueSpeedTable';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';

// Define the transformData function
const transformData = (data) => {
  const result = {
    continuous: {},
    rated: {}
  };

  const continuousParameters = {
    A: ['A_SPEED', 'A_TORQUE', 'A_POWER'],
    B: ['B_SPEED', 'B_TORQUE', 'B_POWER'],
    C: ['C_SPEED', 'C_TORQUE', 'C_POWER'],
    D: ['D_SPEED', 'D_TORQUE', 'D_POWER'],
    E: ['E_SPEED', 'E_TORQUE', 'E_POWER']
  };

  const ratedParameters = {
    F: ['F_SPEED', 'F_TORQUE', 'F_POWER'],
    G: ['G_SPEED', 'G_TORQUE', 'G_POWER'],
    H: ['H_SPEED', 'H_TORQUE', 'H_POWER']
  };

  const getParameterValue = (code) => {
    const param = data.find(d => d.parameterCode === code);
    return param ? parseFloat(param.parameterValue) || 0 : 0;
  };

  for (const [key, codes] of Object.entries(continuousParameters)) {
    result.continuous[key] = codes.map(code => getParameterValue(code));
  }

  for (const [key, codes] of Object.entries(ratedParameters)) {
    result.rated[key] = codes.map(code => getParameterValue(code));
  }

  return result;
};

const PowerSpeed = ({ handlePrevious, handleNext, userEmail, vehicleId  }) => {
  const [plotData, setPlotData] = useState({ chartData: [], chartData2: [], chartData3: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define hardcoded data to replace API response
    const hardcodedData = [
      { parameterCode: 'A_SPEED', parameterValue: '1000' },
      { parameterCode: 'A_TORQUE', parameterValue: '200' },
      { parameterCode: 'A_POWER', parameterValue: '50' },
      { parameterCode: 'B_SPEED', parameterValue: '2000' },
      { parameterCode: 'B_TORQUE', parameterValue: '180' },
      { parameterCode: 'B_POWER', parameterValue: '60' },
      { parameterCode: 'C_SPEED', parameterValue: '3000' },
      { parameterCode: 'C_TORQUE', parameterValue: '160' },
      { parameterCode: 'C_POWER', parameterValue: '70' },
      { parameterCode: 'D_SPEED', parameterValue: '4000' },
      { parameterCode: 'D_TORQUE', parameterValue: '140' },
      { parameterCode: 'D_POWER', parameterValue: '80' },
      { parameterCode: 'E_SPEED', parameterValue: '5000' },
      { parameterCode: 'E_TORQUE', parameterValue: '120' },
      { parameterCode: 'E_POWER', parameterValue: '90' },
      { parameterCode: 'F_SPEED', parameterValue: '1500' },
      { parameterCode: 'F_TORQUE', parameterValue: '190' },
      { parameterCode: 'F_POWER', parameterValue: '55' },
      { parameterCode: 'G_SPEED', parameterValue: '2500' },
      { parameterCode: 'G_TORQUE', parameterValue: '170' },
      { parameterCode: 'G_POWER', parameterValue: '65' },
      { parameterCode: 'H_SPEED', parameterValue: '3500' },
      { parameterCode: 'H_TORQUE', parameterValue: '150' },
      { parameterCode: 'H_POWER', parameterValue: '75' }
    ];

    // Transform and process data
    const transformedData = transformData(hardcodedData);
    processData(transformedData.continuous, transformedData.rated);
  }, [vehicleId, userEmail]);

  const processData = (continuous, rated) => {
    let chartData = [];
    let chartData2 = [];
    let chartData3 = [];

    const calculateAveragePower = (data) => {
      return data.reduce((sum, values) => sum + (values[2] || 0), 0) / data.length;
    };

    let ratedHValue = rated['H'];
    let ratedHData = { x: ratedHValue[0], y: ratedHValue[1], y2: ratedHValue[2] };

    for (const [key, values] of Object.entries(continuous)) {
      let entry = { x: values[0], y: values[1], y2: values[2] };
      chartData.push(entry);
    }

    for (const [key, values] of Object.entries(rated)) {
      let entry = { x: values[0], y: values[1], y2: values[2] };
      chartData2.push(entry);
    }

    chartData.splice(3, 0, ratedHData);
    chartData2.push(chartData[4]);
    chartData2.push(chartData[5]);
    chartData3 = [chartData2[1]];
    chartData2.splice(1, 1);

    const avgContinuousPower = calculateAveragePower(Object.values(continuous));
    const avgRatedPower = calculateAveragePower(Object.values(rated));
    chartData3.push({ x: 'Average', y: avgContinuousPower, y2: avgRatedPower });

    setPlotData({ chartData, chartData2, chartData3 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <TorqueSpeedTable userEmail={userEmail} vehicleId={vehicleId} />
        </div>
        <div>
          <Plot
            data={[
              {
                x: plotData.chartData.map(d => d.x),
                y: plotData.chartData.map(d => d.y2),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#ff0000' },
                name: 'Peak Power (kW)'
              },
              {
                x: plotData.chartData2.map(d => d.x),
                y: plotData.chartData2.map(d => d.y2),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#0000ff' },
                name: 'Continuous Power (kW)'
              },
              {
                x: plotData.chartData3.map(d => d.x),
                y: plotData.chartData3.map(d => d.y2),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'green' },
                name: 'Rated Operating Point'
              }
            ]}
            layout={{
              width: 650,
              height: 450,
              xaxis: { 
                title: { text: 'Speed (RPM)', font: { family: 'Poppins', size: 14, weight: 600, color: '#0069BD' }},
                showgrid: true, zeroline: false, gridcolor: '#c7c7c7', tickcolor: '#c7c7c7'
              },
              yaxis: { 
                title: { text: 'Power(kW)', font: { family: 'Poppins', size: 14, weight: 600, color: '#0069BD' }},
                showgrid: true, zeroline: false, gridcolor: '#c7c7c7', tickcolor: '#c7c7c7'
              },
              margin: { l: 80, r: -50, t: 40, b: 30 },
              title: null,
              legend: { orientation: 'v', x: 0.5, y: -0.3, xanchor: 'center', yanchor: 'top' }
            }}
            config={{ displayModeBar: false, displaylogo: false }}
          />
           
        </div>
        <div style={{height: '66.5px'}}></div>
      <div style={{ display: 'flex', justifyContent: 'center', width: 'calc(78.30vw - 40px)',  position: 'fixed', bottom: '1.56vh', backgroundColor: '#fff', zIndex: '1000'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '53.194vw', padding: '15px 20px' }}>
          <Button
            variant="contained"
            onClick={handlePrevious}
            sx={{
              backgroundColor: '#0069BD',
              borderRadius: '32px',
              color: '#fff',
              textTransform: 'none',
              fontFamily: 'Poppins',
              fontWeight: '400',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#0075d2', // Color on hover
              },
              '&:active': {
                backgroundColor: '#0075d2', // Color on active
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Previous
          </Button>


          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              backgroundColor: '#0069BD',
              borderRadius: '32px',
              color: '#fff',
              textTransform: 'none',
              fontFamily: 'Poppins',
              fontWeight: '400',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#0075d2', // Color on hover
              },
              '&:active': {
                backgroundColor: '#0075d2', // Color on active
              },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </div>
    </div>
    </div>
      </div>
   
    
  );
};

export default PowerSpeed;
