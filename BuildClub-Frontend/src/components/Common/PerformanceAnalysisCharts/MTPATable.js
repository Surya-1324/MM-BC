import React, { useState, useEffect } from "react";
import { CSmartTable } from "@coreui/react-pro";
import '@coreui/coreui/dist/css/coreui.min.css';
import axios from "axios";
import Loading from '../../Common/loading';
import base_url from '../../../services/api';

const MTPATable = () => {
  const columns = [
    { key: 'Torque', label: 'Torque (Nm)' },
    { key: 'Current', label: 'Current (A)' },
    { key: 'PhaseAdvanceAngle', label: 'Phase Advance Angle' },
  ];

  const [usersData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

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
        console.log('API Response:', response.data);
        const mtpa = response.data.output.plots['MTPA'];
        const torqueValue = mtpa['torque'];
        const currentAngle = mtpa['current angle'];
        const idValue = mtpa['id'];
        const iqValue = mtpa['iq'];

        const currentValues = idValue.map((id, i) => {
          const iq = iqValue[i];
          return Math.sqrt(id * id + iq * iq);
        });

        const formattedData = torqueValue.map((torque, i) => ({
          Torque: torque.toFixed(2),
          Current: Math.round(currentValues[i]),
          PhaseAdvanceAngle: currentAngle[i]
        }));
        console.log('Formatted Data:', formattedData);
        setTableData(formattedData);
      } catch (error) {
        console.error('Error fetching MTPA data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="CSmartTable" style={{ marginLeft: '5vw', width: '40vw' }}>
      {loading ? ( 
           <div style={{ display: 'flex', justifyContent: 'flex-start',marginRight:'30px' }}>
           <Loading  />
         </div>
      ) : (
        <div style={{marginTop:'-2.4vh',marginLeft:'5vw', border: '1px solid #B4B4B4', width:'504px', borderRadius: '8px', overflow: 'hidden', overflowY: 'Hidden' }} >
        <table style={{ width: '100%', height:'300px', borderCollapse: 'collapse'}} >
        <thead>
          <tr style={{borderBottom: '1px solid #B4B4B4'}}>
            <th style={{ color: '#0069BD', fontSize: '14px', padding: '10px 30px', textAlign:'right', backgroundColor: '#E0F0FF', fontWeight: 600 }}>
              Torque(Nm)
            </th>
            <th style={{ color: '#0069BD', fontSize: '14px', padding: '10px 30px', textAlign:'right', backgroundColor: '#E0F0FF', fontWeight: 600 }}>
             Current(A)
            </th>
            <th style={{ color: '#0069BD', fontSize: '14px', padding: '10px 30px', textAlign:'right', backgroundColor: '#E0F0FF', fontWeight: 600 }}>
             Phase Advance Angle
            </th>
          </tr>
        </thead>
        <tbody>
      {usersData.map((row, index) => (
      <tr key={index}>
        <td style={{
          color: '#222222',
          fontSize: '14px',
          padding: '10px 30px',
          textAlign:'right',
          borderBottom: index === usersData.length - 1 ? 'none' : '1px solid #B4B4B4' // Remove border for the last row
        }}>
          {row.Torque}
        </td>
        <td style={{
          color: '#222222',
          fontSize: '14px',
          padding: '10px 30px',
          textAlign: 'right',
          borderBottom: index === usersData.length - 1 ? 'none' : '1px solid #B4B4B4' // Remove border for the last row
        }}>
          {row.Current}
        </td>
        <td style={{
          color: '#222222',
          fontSize: '14px',
          padding: '10px 30px',
          textAlign: 'right',
          borderBottom: index === usersData.length - 1 ? 'none' : '1px solid #B4B4B4' // Remove border for the last row
        }}>
          {row.PhaseAdvanceAngle}
        </td>
      </tr>
      ))}
      </tbody>
  
  
      </table>
      </div>
      )}
    </div>
    
  );
};

export default MTPATable;
