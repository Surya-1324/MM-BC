import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/api';
import TorqueTable from './TorqueTable'; // Import your TorqueSpeedTable component

import ErrorPage from './ErrorComponents/404Error';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = 'vehicledynamics-services/vehicledynamics/vehicle/all';
    // const params = { userId: 'venkatesh.j@pilabz.in' };
    const params = { userId: 'yuvaraja.t@pilabz.in' };

    // const params = { userId: 'bala@pilabz.in' };

    const getData = async () => {
      try {
        const result = await fetchData(endpoint, params);
        setData(result);
        console.log('Response from Server: ',result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorPage/>;

  return (
    <div>
      <h1>Torque Speed Table</h1>
      <TorqueTable data={data} />
    </div>
  );
};

export default App;
