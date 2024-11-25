import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import axios from 'axios';
import base_url from '../../../services/api';

const WindingTemperaturePlot = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = sessionStorage.getItem('user_id');
        const vehicle_name = localStorage.getItem('applicationName');

        const response = await axios.post(base_url+'/get_motor_data', {
          user_id,
          vehicle_name,
          motor_name: vehicle_name + '_Motor'
        });

        console.log("Full response data:", response.data);

        const thermal_data = response.data.output?.plots?.performance?.data?.thermal;

        if (!thermal_data) {
          console.error('Thermal data is missing in the response.');
          return;
        }

        const customColorscale = [
          [0, 'white'],
          [0.5, 'blue'],
          [0.7, 'darkblue'],
          [0.9, 'red'],
          [1, 'red']
        ];

        const data = [{
          z: thermal_data.z,
          x: thermal_data.x,
          y: thermal_data.y,
          type: 'surface',
          colorscale: customColorscale,
          contours: {
            z: {
              show: true,
              usecolormap: true,
              highlightcolor: "#42f462",
              project: { z: true }
            }
          }
        }];

        const layout = {
          title: 'Winding Temperature Plot',
          scene: {
            xaxis: {  title: {
              text: 'Speed (RPM)',
              font: {
                family: 'poppins',
                size: 14,
                color: '#0069BD',
                 weight: '600'
              }
              
            } },
            yaxis: { title: {
              text: 'torque (NM)',
              font: {
                family: 'poppins',
                size: 14,
                color: '#0069BD',
                 weight: '600'
              }
              
            } },
            zaxis: {  title: {
              text: 'Temperature (%)',
              font: {
                family: 'poppins',
                size: 14,
                color: '#0069BD',
                 weight: '600'
              }
              
            } }
          },
          autosize: true,
          width: 600,
          height: 600,
          margin: {
            l: 65,
            r: 50,
            b: 65,
            t: 90,
          },
          paper_bgcolor: 'rgba(255,255,255,0.8)',
          plot_bgcolor: 'rgba(200,200,200,0.8)'
        };

        const config = {
          displaylogo: false,
        };

        Plotly.newPlot('myDiv', data, layout, config);
        console.log('Plot successfully rendered.');

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>
    <div id="myDiv"></div>
  </div>;
};

export default WindingTemperaturePlot;
