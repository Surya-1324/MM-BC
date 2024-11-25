import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Plot from 'react-plotly.js';
import TorqueSpeedTable from './TorqueSpeedTable';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';

const TorqueSpeed = ({ handlePrevious, handleNext, userEmail, vehicleId, vehicleName }) => {
  const navigate = useNavigate();

  // Hardcoded plot data
  const plotData = {
    chartData: [
      { x: [1000, 2000, 3000], y: [200, 150, 100], y2: [10, 20, 30] }, // Example data
    ],
    chartData2: [
      { x: [1000, 2000, 3000], y: [180, 130, 90], y2: [12, 22, 32] }, // Example data
    ],
    chartData3: [
      { x: [1500], y: [170], y2: [15] }, // Example data
    ],
  };

  const handlePreviousVP = () => {
    navigate('/user/motor-wiz');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <TorqueSpeedTable/>
        </div>
        <div>
          <Plot
            data={[
              {
                x: plotData.chartData.map(d => d.x).flat(),
                y: plotData.chartData.map(d => d.y).flat(),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
                name: 'Peak Torque (Nm)',
              },
              {
                x: plotData.chartData2.map(d => d.x).flat(),
                y: plotData.chartData2.map(d => d.y).flat(),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'blue' },
                name: 'Continuous Torque (Nm)',
              },
              {
                x: plotData.chartData3.map(d => d.x).flat(),
                y: plotData.chartData3.map(d => d.y).flat(),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'green' },
                name: 'Rated Operating Point',
              },
            ]}
            layout={{
              width: 650,
              height: 450,
              xaxis: { title: { text: 'Speed (RPM)' } },
              yaxis: { title: { text: 'Torque (Nm)' } },
              margin: { l: 80, r: 20, t: 40, b: 30 },
              legend: { orientation: 'v', x: 0.5, y: -0.3, xanchor: 'center', yanchor: 'top' }
            }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>

      <div style={{height: '66.5px'}}></div>
      <div style={{ display: 'flex', justifyContent: 'center', width: 'calc(78.30vw - 40px)',  position: 'fixed', bottom: '1.56vh', backgroundColor: '#fff', zIndex: '1000'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '53.194vw', padding: '15px 20px' }}>
          <Button
            variant="contained"
            onClick={handlePreviousVP}
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

  );
};

export default TorqueSpeed;
