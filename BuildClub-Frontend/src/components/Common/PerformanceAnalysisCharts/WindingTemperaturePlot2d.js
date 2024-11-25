import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Loading from '../../Common/loading';
import axios from 'axios';
import base_url from '../../../services/api';

const EfficiencyPlot2d = () => {
  const [thermalData, setThermalData] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchData = async () => {
      const user_id = sessionStorage.getItem('user_id');
      const vehicle_name = localStorage.getItem('applicationName');
      setLoading(true);
      try {
        const response = await axios.post(base_url+'/get_motor_data', {
          user_id,
          vehicle_name,
          motor_name: vehicle_name + '_Motor'
        });

        const thermal =response.data.output?.plots?.performance?.data?.efficiency;
        console.log('Data fetched successfully');

        setThermalData(thermal);
      } catch (error) {
        console.error('Error fetching thermal data:', error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start',marginRight:'10px' }}>
        <Loading style={{ width: '10vw' }} />
      </div>
    );
  }

  const customColorscale = [
    [0, 'white'],
    [0.5, 'blue'],
    [0.7, 'darkblue'],
    [0.9, 'red'],
    [1, 'red']
  ];

  const eff_data = [{
    x: thermalData.x,
    y: thermalData.y,
    z: thermalData.z,
    type: 'contour',
    hovertemplate: 'Speed (RPM): %{x}<br>Torque (Nm): %{y}<br>Thermal (%) : %{z}<extra></extra>',
    colorscale: customColorscale
  }];

  const eff_layout = {
    xaxis: { 
      title: 'Speed (RPM)',
      titlefont: {
        family: 'poppins',
        size: 14,
        color: '#0069BD',
        weight: '600'
      }
    },
    yaxis: { 
      title: 'Torque (Nm)',
      titlefont: {
        family: 'poppins',
        size: 14,
        color: '#0069BD',
        weight: '600'
      }
    },
    autosize: true, // Enable autosizing for responsiveness
    height: 600,
    margin: {
      l: 65,
      r: 50,
      b: 75,
      t: 90,
    },
    paper_bgcolor: 'rgba(255,255,255,0.8)',
    plot_bgcolor: 'rgba(200,200,200,0.8)'
  };

  const config = {
    displayModeBar: false, 
    responsive: true
  };

  return (
    <div style={{ width: '75vh', height: '600px' }}>
      <Plot
        data={eff_data}
        layout={eff_layout}
        config={config}
        style={{ width: '100%', height: '100%' }} // Ensures the plot takes full width and height of the container
      />
    </div>
  );
};

export default EfficiencyPlot2d;
