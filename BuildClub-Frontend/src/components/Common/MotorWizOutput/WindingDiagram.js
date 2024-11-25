import React, { useState, useEffect } from 'react';
import { Button,IconButton } from '@mui/material';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import { ReactComponent as InfoIcon } from '../../../assets/images/icons/InfoBlueIcon.svg'; 
import Loading from '../../Common/loading';
import axios from 'axios';
import InfoDrawer from '../../Common/InfoDrawer'; 
import WindingDiagramDrawer from '../info_drawer/WindingDiagramDrawer';
import base_url from '../../../services/api';

const WindingDiagram = ({ handlePrevious, handleNext }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); 

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    const vehicle_name = localStorage.getItem('applicationName');

    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await axios.post(base_url+'/get_motor_data', {
          user_id: user_id,
          vehicle_name: vehicle_name,
          motor_name: vehicle_name + '_Motor',
        });

        const winding_image = response.data.output?.winding;

        if (winding_image) {
          setImageSrc(`data:image/png;base64,${winding_image}`);
          console.log('Winding image fetched and parsed successfully.');
        } else {
          console.error('No Winding image found in the response.');
        }
      } catch (error) {
        console.error('Error fetching winding image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = sessionStorage.getItem('user_id');
        const vehicle_name = localStorage.getItem('applicationName');

        const response = await axios.post(base_url+'/get_motor_data', {
          user_id,
          vehicle_name,
          motor_name: vehicle_name + '_Motor',
        });

        if (response.data.status === 'finished') {
          const outputData = response.data.output;
          const inputData = JSON.parse(response.data.input);
          console.log(response.data);
          const fetchedTableData = [
            { parameter: '', value: 'U Phase', color: 'red' },
            { parameter: '', value: 'V Phase', color: 'blue' },
            { parameter: '', value: 'W Phase', color: 'green' },
            { parameter: 'Turn Per Slot', value: outputData.turns },
            { parameter: 'Parallel Strands', value: outputData.strands },
            { parameter: 'Wire Gauge', value: inputData.wire[0] },
            { parameter: <>Fill Factor <b>(%)</b></>, value: inputData.fill_factor },
            { parameter: <>Phase Resistance <b>(mΩ)</b></>, value: outputData.rph },
          ];

          setTableData(fetchedTableData);
        }
      } catch (error) {
        console.error('Error fetching motor data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ borderRadius: '8px', overflow: 'hidden', marginTop: '20px', marginLeft: '30px',border:'1px solid #b4b4b4',overflowY:'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ fontSize: '14px', padding: '1vh 2vw', backgroundColor: '#E0F0FF', fontWeight: 600,  borderBottom: '1px solid #b4b4b4' }}>Parameter
                  <IconButton
          style={{color:'#0069db', marginLeft:'6px'}}
          onClick={() => setDrawerOpen(true)} // Open the drawer on click
        >
          <InfoIcon  style={{  height:'16px', width:'16px' }}  />
        </IconButton>

                  </th>
                  
                  <th style={{ fontSize: '14px', padding: '1vh 2vw', backgroundColor: '#E0F0FF', fontWeight: 600, borderBottom: '1px solid #b4b4b4',textAlign:'right' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ fontSize: '14px', padding: '1vh 2vw', borderBottom: index === tableData.length - 1 ? 'none' : '1px solid #B4B4B4' }}>
                      {row.color && (
                        <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: row.color, marginRight: '10px', borderRadius: '50%' }}></span>
                      )}
                      {row.parameter}
                    </td>
                    <td style={{ fontSize: '14px', padding: '1vh 2vw', borderBottom: index === tableData.length - 1 ? 'none' : '1px solid #B4B4B4',textAlign:'right' }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginRight: '20px', width: '38vw' }}>
          <div style={{ width: '80%', maxWidth: '500px', height: 'auto', position: 'relative', overflow: 'hidden' }}>
            <img
              src={imageSrc}
              alt="windingDia"
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

      <InfoDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} 
        infoTitle={''} 
        infoText={<WindingDiagramDrawer />} 
        />
    </div>
  );
};

export default WindingDiagram;
