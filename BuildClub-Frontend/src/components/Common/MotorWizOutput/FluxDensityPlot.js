import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import axios from 'axios';
import Loading from '../../Common/loading';
import base_url from '../../../services/api';


const FluxDensityPlot = ({ handlePrevious, handleNext }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user_id= sessionStorage.getItem('user_id')
    const vehicle_name=localStorage.getItem('applicationName')
    const fetchFluxImage = async () => {
      setLoading(true);
      try {
        const response = await axios.post(base_url+'/get_motor_data',{
          user_id: user_id,
          vehicle_name: vehicle_name,
          motor_name: vehicle_name+'_Motor',
        }); 
      
        const flux_image = response.data.output?.density_plot;

        if (flux_image) {
          setImageSrc(`data:image/png;base64,${flux_image}`);
          console.log('flux image fetched and parsed successfully.');
        } else {
          console.error('No flux image found in the response.');
        }
      } catch (error) {
        console.error('Error fetching flux image:', error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchFluxImage();
  }, []);
  if(loading) return <Loading/>
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <img src={imageSrc} alt="DensityPlot" style={{ width: '400px', height: '400px' }} /> 
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

export default FluxDensityPlot;
