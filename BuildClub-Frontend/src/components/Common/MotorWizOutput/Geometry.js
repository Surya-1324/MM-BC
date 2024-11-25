import React, { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as InfoBlueIcon } from '../../../assets/images/icons/InfoBlueIcon.svg'; 
import Loading from '../../Common/loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfoDrawer from '../../Common/InfoDrawer'; // Import the InfoDrawer component
import GeometryDrawer from '../info_drawer/GeometryDrawer';
import base_url from '../../../services/api';


const Geometry = ({ handlePrevious, handleNext }) => {

  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage InfoDrawer visibility

  const navigate = useNavigate();
  
  const routeback = () => {
    navigate('/user/motor-wiz'); 
  };
  
  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    const vehicle_name = localStorage.getItem('applicationName');

    const fetchGeometryImage = async () => {
      setLoading(true);
      try {
        const response = await axios.post(base_url+'/get_motor_data', {
          user_id: user_id,
          vehicle_name: vehicle_name,
          motor_name: vehicle_name + '_Motor',
        }); 
        
        const geometry_image = response.data.output?.dxf;

        if (geometry_image) {
          setImageSrc(`data:image/png;base64,${geometry_image}`);
          console.log('Geometry image fetched and parsed successfully.');
        } else {
          console.error('No geometry image found in the response.');
        }
      } catch (error) {
        console.error('Error fetching geometry image:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchGeometryImage();
  }, []);
  
  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    const vehicle_name = localStorage.getItem('applicationName');

    const fetchMotorData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(base_url+'/get_motor_data', {
          user_id: user_id,
          vehicle_name: vehicle_name,
          motor_name: vehicle_name + '_Motor',
        });

        if (response.data.status === 'finished') {
          const outputData = response.data.output; 
          if (outputData.geometry) {
            const newTableData = [
              { parameter: <>Rotor OD <b>(mm)</b></>, value: Math.round(outputData.geometry.rotor_od) },
              { parameter: <>Tooth Thickness <b>(mm)</b></>, value: Math.round(outputData.geometry.tooth_thickness) },
              { parameter: <>Slot OD <b>(mm)</b></>, value: Math.round(outputData.geometry.slot_od) },
              { parameter: <>Slot Depth <b>(mm)</b></>, value: Math.round(outputData.geometry.slot_depth) },
              { parameter: <>Yoke Thickness <b>(mm)</b></>, value: Math.round(outputData.geometry.yoke_thickness) },
              { parameter: <>Stator OD <b>(mm)</b></>, value: Math.round(outputData.geometry.stator_od) },
              { parameter: <>Shaft Diameter <b>(mm)</b></>, value: Math.round(outputData.geometry.shaft_dia) },
              { parameter: <>Stack Length <b>(mm)</b></>, value: Math.round(outputData.geometry.stack_length) },
              { parameter: <>Magnet Dimensions <b>(mm)</b></>, value:"12 x 15 x 3" },
            ];
            setTableData(newTableData);
          } else {
            console.error('Geometry data is missing in the output.');
          }
        }
        console.log('Data fetched');
      } catch (error) {
        console.error('Error fetching motor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.389vh', marginLeft: '5vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
        <div style={{ borderRadius: '0.5vw', overflow: 'hidden', marginTop: '2vh', marginLeft: '2vw', border: '1px solid #b4b4b4', overflowY: 'auto' }}>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ fontSize: '14px', padding: '1vh 2vw', backgroundColor: '#E0F0FF', fontWeight: 600, borderBottom: '1px solid #b4b4b4' }}>
          Parameter
          <IconButton onClick={() => setDrawerOpen(true)} style={{color:'#0069db', marginLeft:'6px'}}>
            <InfoBlueIcon style={{  height:'16px', width:'16px' }}  />
          </IconButton>
          <InfoDrawer 
            open={drawerOpen} 
            onClose={() => setDrawerOpen(false)} 
            infoTitle={''} 
            infoText={<GeometryDrawer />} 
          />
        </th>
        <th style={{ fontSize: '14px', padding: '1vh 2vw', backgroundColor: '#E0F0FF', fontWeight: 600, borderBottom: '1px solid #b4b4b4', textAlign:'right' }}>
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      {tableData.map((row, index) => (
        <tr key={index}>
          <td style={{ fontSize: '14px', padding: '1vh 2vw', borderBottom: index === tableData.length - 1 ? 'none' : '1px solid #B4B4B4' }}>
            {row.parameter}
          </td>
          <td style={{ fontSize: '14px', padding: '1vh 2vw', paddingLeft: index === tableData.length - 1 ? '1.5vw' : '4vw', borderBottom: index === tableData.length - 1 ? 'none' : '1px solid #B4B4B4' , textAlign:'right'}}>
            {row.value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginRight: '5 vw', width: '40vw' }}>
          <div style={{ width: '80%', maxWidth: '30.72vw', height: 'auto', position: 'relative', overflow: 'hidden' }}>
            <img
              src={imageSrc}
              alt="GeoMotorWiz"
              style={{
                width: '100%',
                height: 'auto', 
                display: 'block',
                margin: '0 auto',
              }}
            />
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
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </div>
    </div>
    </div>
  );
};

export default Geometry;
