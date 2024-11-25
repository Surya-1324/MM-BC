import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Loading from '../../Common/loading';
import base_url from '../../../services/api';

const EfficiencyPlot2d = () => {
  const [efficiencyData, setEfficiencyData] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const user_id = sessionStorage.getItem('user_id');
      const vehicle_name = localStorage.getItem('applicationName');

      try {
        const response = await axios.post(base_url+'/get_motor_data', {
          user_id,
          vehicle_name,
          motor_name: vehicle_name + '_Motor'
        });

        const efficiency = response.data.output?.plots?.performance?.data?.efficiency;
        setEfficiencyData(efficiency);
        console.log('Data fetched successfully and chart data processed.');
        
      } catch (error) {
        console.error('Error fetching efficiency data:', error);
      } finally {
        setLoading(false);  // Stop loading after data is fetched
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Loading style={{ width: '10vw' }} />
      </div>
    );
  }
  

  const customColorscale = [
    [0, 'white'],
    [0.5, 'yellow'],
    [1, 'green']
  ];

  const eff_data = [{
    x: efficiencyData.x,
    y: efficiencyData.y,
    z: efficiencyData.z,
    type: 'contour',
    hovertemplate: 'Speed (RPM): %{x}<br>Torque (Nm): %{y}<br>Efficiency (%): %{z}<extra></extra>',
    colorscale: customColorscale
  }];

  const eff_layout = {
    
    xaxis: {
      title: {
        text: 'Speed (RPM)',
        font: {
          family: 'poppins',
          size: 14,
          color: '#0069BD',
           weight: '600'
        }
        
      }
    },
    yaxis: {
      title: {
        text: 'Torque (Nm)',
        font: {
          family: 'poppins',
          size: 14,
          color: '#0069BD',
           weight: '600'
        }
      }
    },
    height: 600,
    paper_bgcolor: 'rgba(255,255,255,0.8)',
    plot_bgcolor: 'rgba(200,200,200,0.8)'
  };

  const config = {
    displayModeBar: false,
    responsive: true
  };

  return (
    <Plot
      data={eff_data}
      layout={eff_layout}
      config={config}
      style={{ width: '75vh', height: '100%' }}
    />
  );
};

export default EfficiencyPlot2d;
