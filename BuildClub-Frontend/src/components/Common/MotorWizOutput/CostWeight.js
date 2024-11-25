import React, { useState,useEffect } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as SaveIcon } from '../../../assets/images/icons/save.svg';
import { ReactComponent as InfoBlueIcon } from '../../../assets/images/icons/InfoBlueIcon.svg'; 
import { Navigate } from 'react-router-dom';
import Loading from '../../Common/loading'; 
import axios from 'axios';
import base_url from '../../../services/api';


const CostWeight = ({ handlePrevious }) => {
  const [tableData, setTableData] =useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchMaterialData = async () => {
      setLoading(true);
      try {
        const user_id = sessionStorage.getItem('user_id');
        const vehicle_name = localStorage.getItem('applicationName');

        const response = await axios.post(base_url+'/get_motor_data', {
          user_id,
          vehicle_name,
          motor_name: `${vehicle_name}_Motor`,
        });

        if (response.data.status === 'finished') {
          const outputData = response.data.output;

          const fetchedTableData = [
            { material: 'Stator Steel', weight: Math.round(outputData.cost.stator_steel[0]), cost: Math.round(outputData.cost.stator_steel[1]) },
            { material: 'Rotor Steel', weight: Math.round(outputData.cost.rotor_steel[0]), cost: Math.round(outputData.cost.rotor_steel[1]) },
            { material: 'Conductor', weight: Math.round(outputData.cost.conductor[0]), cost: Math.round(outputData.cost.conductor[1]) },
            { material: 'Magnet', weight: Math.round(outputData.cost.magnet[0]), cost: Math.round(outputData.cost.magnet[1]) },
          ];
          

          setTableData(fetchedTableData);
        }
        console.log('data fetched');
      } catch (error) {
        console.error('Error fetching material data:', error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchMaterialData();
  }, []);
  const [navigateToLogin, setNavigateToLogin] = useState(false);

  const totalWeight = tableData.reduce((sum, row) => sum + row.weight, 0);
  const totalCost = tableData.reduce((sum, row) => sum + row.cost, 0);

  const getTooltipMessage = (material) => {
    if (material === 'Conductor') {
      return 'Assumed Price For Conductor Rs.900/kg';
    }
    if (material === 'Magnet') {
      return 'Assumed Price For Magnet Rs.3000/Kg';
    }
    if (material === 'Stator Steel' || material === 'Rotor Steel') {
      return 'Assumed Price For Steel Rs.200/Kg';
    }
    return `More information about ${material}`;
  };

  const handleNext = () => {
    setNavigateToLogin(true);
  };

  if (navigateToLogin) {
    return <Navigate to="/login" />;
  }
  if (loading) return <Loading />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div style={{ width:'50%' }}>
    <div
      style={{
        width:'480px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #b4b4b4',
        overflowY: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                fontSize: '16px',
                padding: '10px 30px',
                backgroundColor: '#E0F0FF',
                fontWeight: 500,
                borderBottom: '1px solid #b4b4b4',
                color:"#0069bd"
              }}
            >
              Material
            </th>
            <th
              style={{
                fontSize: '16px',
                padding: '10px 30px',
                backgroundColor: '#E0F0FF',
                fontWeight: 500,
                textAlign:'right',
                borderBottom: '1px solid #b4b4b4',
                color:"#0069bd"
              }}
            >
              Weight <b>(g)</b>
            </th>
            <th
              style={{
                fontSize: '16px',
                padding: '10px 30px',
                backgroundColor: '#E0F0FF',
                fontWeight: 500,
                textAlign:'right',
                borderBottom: '1px solid #b4b4b4',
                color:"#0069bd"
              }}
            >
              Cost <b>(INR)</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td
                style={{
                  fontSize: '14px',
                  padding: '10px 30px',
                  borderBottom: '1px solid #b4b4b4',
                }}
              >
                {row.material}
                <Tooltip title={getTooltipMessage(row.material)} >
                        <IconButton size='small' style={{color:'#0069db', marginLeft:'8px'}} >
                          <InfoBlueIcon style={{  height:'16px', width:'16px' }}/>
                        </IconButton>
                      </Tooltip>
              </td>
              <td
                style={{
                  fontSize: '14px',
                  padding: '10px 30px',
                  textAlign:'right',
                  borderBottom: '1px solid #b4b4b4',
                }}
              >
                {row.weight}
              </td>
              <td
                style={{
                  fontSize: '14px',
                  padding: '10px 30px',
                  textAlign:'right',
                  borderBottom: '1px solid #b4b4b4',
                }}
              >
                {row.cost}
              </td>
            </tr>
          ))}
          <tr>
            <td
              style={{
                fontSize: '14px',
                padding: '10px 30px',
            
                borderBottom: 'none', 
                fontWeight: 600,
              }}
            >
              Total
            </td>
            <td
              style={{
                fontSize: '14px',
                padding: '10px 30px',
                textAlign:'right',
                borderBottom: 'none', 
                fontWeight: 600,
              }}
            >
              {totalWeight}
            </td>
            <td
              style={{
                fontSize: '14px',
                padding: '10px 30px',
               textAlign:'right',
                borderBottom: 'none', 
                fontWeight: 600,
              }}
            >
              {totalCost}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div style={{height: '66.5px'}}></div>
      <div style={{ display: 'flex', justifyContent: 'center', width: 'calc(78.30vw - 40px)',  position: 'fixed', bottom: '1.56vh', backgroundColor: '#fff', zIndex: '1000'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '53.194vw', padding: '15px 20px' }}>
          <Button
            variant="contained"
            onClick={handlePrevious}
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
            endIcon={<SaveIcon />}
          >
            Download
          </Button>
        </div>
    </div>
    </div>
  );
};

export default CostWeight;
