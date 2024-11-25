import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, SplineSeries, Tooltip, Legend } from '@syncfusion/ej2-react-charts';
import Loading from '../../Common/loading'; // Adjust the path as necessary
import base_url from '../../../services/api';

const MotorConstraintCurves = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [iMax, setIMax] = useState(0); // State to hold i_max
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
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

        const current_circle = data['CURRENT CIRCLE'];
        const voltage_eclipse = data['VOLTAGE ELLIPSE'];
        const constant_torque = data['CONSTANT TORQUE'];
        const i_max = response.data.output?.i_max; // Extracting i_max

        setIMax(i_max || 0); // Set i_max state, default to 0 if undefined

        const createObject = (arr1, arr2) => {
          return arr1.map((x, i) => ({
            x,
            y: arr2[i]
          }));
        };

        const seriesList = [];

        for (const key in current_circle) {
          const currentCircleValues = createObject(current_circle[key][0], current_circle[key][1]);
          seriesList.push({
            dataSource: currentCircleValues,
            width: 2,
            xName: 'x',
            yName: 'y',
            name: 'Current Limit (A)',
            type: 'Spline',
            splineType: 'Cardinal',
            fill: 'red'
          });
        }

        for (const key in voltage_eclipse) {
          const voltageEclipseData = createObject(voltage_eclipse[key][0], voltage_eclipse[key][1]);
          seriesList.push({
            dataSource: voltageEclipseData,
            dashArray: '5, 1',
            width: 2,
            xName: 'x',
            yName: 'y',
            name: `${key} RPM`,
            type: 'Spline'
          });
        }

        for (const key in constant_torque) {
          const constantTorqueData = createObject(constant_torque[key][0], constant_torque[key][1]);
          seriesList.push({
            dataSource: constantTorqueData,
            dashArray: '5, 1',
            width: 2,
            xName: 'x',
            yName: 'y',
            name: `${key} Nm`,
            type: 'Spline'
          });
        }

        setSeriesList(seriesList);
        console.log('Data fetched successfully and chart data processed.');

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Loading style={{ width: '10vw', marginLeft: 0 }} />
      </div>
    );
  }

  return (
    <div style={{ width: '600px', height: '500px' }}>
      <ChartComponent
        primaryXAxis={{ title: 'I RMS(A)', minimum: 0, maximum: iMax ? -iMax * 1.2 : 0 ,  titleStyle: { color: '#0069BD', fontFamily: 'Poppins', fontWeight: 600 }}} // Use iMax
        primaryYAxis={{ title: 'Iq RMS(A)', labelFormat: '{value}', minimum: 0, maximum: iMax ? iMax * 1.2 : 0 , titleStyle: { color: '#0069BD', fontFamily: 'Poppins', fontWeight: 600 }}} // Use iMax
        tooltip={{ enable: true }}
        legendSettings={{ visible: true, position: 'Right' }}
      >
        <Inject services={[SplineSeries, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          {seriesList.map((series, index) => (
            <SeriesDirective key={index} {...series} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default MotorConstraintCurves;
