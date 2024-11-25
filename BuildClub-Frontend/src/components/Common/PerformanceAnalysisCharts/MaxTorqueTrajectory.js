import React, { useEffect } from 'react';
import Loading from '../../Common/loading';
import axios from 'axios';
import base_url from '../../../services/api';

const MaxTorqueTrajectory = () => {
  let chart;
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

        const data = response.data.output?.plots;
        if (!data) {
          console.error('Plot data is missing in the response.');
          return;
        }

        const mtpa = data["MTPA"];
        const id_mtpa_values = mtpa['id'];
        const iq_mtpa_values = mtpa['iq'];
        const torque_values = mtpa['torque'];
        const current_circle = data['CURRENT CIRCLE'];

        const current_arr = [];
        const angle_arr = [];

        for (let i = 0; i < id_mtpa_values.length; i++) {
          const id_val = id_mtpa_values[i];
          const iq_val = iq_mtpa_values[i];

          const curr = Math.sqrt(id_val * id_val + iq_val * iq_val);
          const angle = Math.atan(id_val / iq_val);

          current_arr.push(curr);
          angle_arr.push(angle);
        }

        function createObject(arr1, arr2, torque_arr, current_arr, angle_arr, name) {
          return arr1.map((x, i) => ({
            x,
            y: arr2[i],
            torque: torque_arr[i],
            current: current_arr[i],
            angle: angle_arr[i],
            label: name
          }));
        }

        const torqueGraphValues = createObject(id_mtpa_values, iq_mtpa_values, torque_values, current_arr, angle_arr, 'torque');

        const seriesList = [
          {
            dataSource: torqueGraphValues,
            width: 2,
            xName: 'x',
            yName: 'y',
            name: 'Torque (Nm)',
            type: 'Spline',
            splineType: 'Monotonic',
            fill: 'blue'
          },
        ];

        Object.keys(current_circle).forEach(key => {
          const currentCircleValues = createObject(current_circle[key][0], current_circle[key][1], [], [], [], 'current');
          seriesList.push({
            dataSource: currentCircleValues,
            width: 2,
            xName: 'x',
            yName: 'y',
            name: 'Current Limit(A)',
            type: 'Spline',
            splineType: 'Cardinal',
            fill: 'red'
          });
        });

        // Initialize the chart
        const chart = new window.ej.charts.Chart({
          primaryXAxis: {
            title: 'Id RMS(A)',
            titleStyle: { color: '#0069BD', fontFamily: 'Poppins', fontWeight: 600 }
          },
          primaryYAxis: {
            title: 'Iq RMS(A)',
            titleStyle: { color: '#0069BD', fontFamily: 'Poppins', fontWeight: 600 },
            labelFormat: '{value}'
          },
          series: seriesList,
          tooltip: {
            enable: true,
          },
          legendSettings: {
            visible: true,
            position: 'Right',
          }
        });

        chart.appendTo('#graph_sheet_6_child');
        console.log('Data fetched successfully and chart data processed.');

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div id="graph_sheet_6_child" style={{ width: '600px', height: '500px' }}></div>
    </div>
  );
};

export default MaxTorqueTrajectory;
