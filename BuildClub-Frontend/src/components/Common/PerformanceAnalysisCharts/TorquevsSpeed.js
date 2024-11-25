import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import base_url from '../../../services/api';

const TorqueSpeedPlot = () => {
  const [plotData, setPlotData] = useState(null);

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

            const plots = response.data.output.plots['TORQUE SPEED'];
            const operatingTorqueSpeedValues = plots['operating torque speed'];
            const torqueSpeedValues = plots['torque speed'];
            
            const createObject = (arr1, arr2, isOperating) => {
                const result = arr1.map((x, index) => ({ x, y: arr2[index] }));
                if (isOperating) {
                    result.push({ x: arr1[arr1.length - 1], y: 0.001 });
                }
                return result;
            };

            const operatingTorqueSpeed = createObject(
                operatingTorqueSpeedValues[0], 
                operatingTorqueSpeedValues[1],
                true 
            );
            const torqueSpeed = createObject(
                torqueSpeedValues[0], 
                torqueSpeedValues[1], 
                false
            );

            setPlotData({ operatingTorqueSpeed, torqueSpeed });
            console.log('data fetched');
        } catch (error) {
            console.error('Error fetching torque speed data:', error);
        }
        
    };

    fetchData();
}, []);

  if (!plotData) {
      return <div>Loading...</div>;
  }

  const operatingTorqueSpeedTrace = {
      x: plotData.operatingTorqueSpeed.map((d) => d.x),
      y: plotData.operatingTorqueSpeed.map((d) => d.y),
      type: 'scatter',
      mode: 'lines',
      name: 'Operating Torque Speed',
      line: { color: 'red' },
      hovertemplate: '<b>Operating Torque Speed</b><br>Speed: %{x}<br>Torque: %{y}<extra></extra>'
  };

  const torqueSpeedTrace = {
      x: plotData.torqueSpeed.map((d) => d.x),
      y: plotData.torqueSpeed.map((d) => d.y),
      type: 'scatter',
      mode: 'lines',
      name: 'Torque Speed Curve',
      line: { color: 'skyblue' },
      hovertemplate: '<b>Torque Speed Curve</b><br>Speed: %{x}<br>Torque: %{y}<extra></extra>'
  };

  const layout = {
    xaxis: {
      title: {
        text: 'Speed (RPM)',
        font: {
          family: 'Poppins',
          size: 14,
          color: '#0069BD',
          weight: '600'
        }
      },
  
    },
    yaxis: {
      title: {
        text: 'Torque (Nm)',
        font: {
          family: 'Poppins',
          size: 14,
          color: '#0069BD',
          weight: '600'
        }
      },
      
    },
    legend: {
      orientation: 'v',
      x: 1,
      xanchor: 'left',
      y: 1
    },
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 50
    }
  };

  const style = {
    width: 700,
    height: 500
  };

  return (
    <div>
      <Plot
        style={style}
        data={[torqueSpeedTrace, operatingTorqueSpeedTrace]}
        layout={layout}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            'pan2d',
            'zoomIn2d',
            'zoomOut2d',
            'autoscale',
            'resetScale2d',
            'zoom2d'
          ],
          doubleClick: false // Disable the default double-click behavior on the legend
        }}
      />
    </div>
  );
};

export default TorqueSpeedPlot;
