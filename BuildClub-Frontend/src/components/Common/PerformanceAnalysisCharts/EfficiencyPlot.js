import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import axios from 'axios';
import base_url from '../../../services/api';

const ElevationGraph = () => {
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

        console.log("Full response data:", response.data);
  
        const efficiency_data = response.data.output?.plots?.performance?.data?.efficiency;

        if (!efficiency_data) {
          console.error('Efficiency data is missing in the response:', response.data);
          return;
        }
  
        const customColorscale = [
          [0, 'white'],
          [0.5, 'yellow'],
          [1, 'green']
        ];
  
        const data = [{
          z: efficiency_data.z,
          x: efficiency_data.x,
          y: efficiency_data.y,
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
         
          scene: {
            xaxis: { title: {
              text: 'Speed (RPM)',
              font: {
                family: 'poppins',
                size: 14,
                color: '#0069BD',
                 weight: '600'
              }
              
            } },
            yaxis: {  title: {
              text: 'Torque (NM)',
              font: {
                family: 'poppins',
                size: 14,
                color: '#0069BD',
                 weight: '600'
              }
              
            } },
            zaxis: {  title: {
              text: 'Efficiency (%)',
              font: {
                family: 'poppins',
                size: 14,
                color: '#0069BD',
                 weight: '600'
              }
              
            } }
          },
          autosize: false,
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
        console.log('Data fetched successfully and chart data processed.');

      } catch (error) {
        console.error('Error fetching efficiency data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  return <div>
    <div id="myDiv"></div>
    </div>
};

export default ElevationGraph;
