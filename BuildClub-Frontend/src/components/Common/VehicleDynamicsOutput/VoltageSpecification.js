import React, { useState } from 'react';
import { IconButton ,Button} from '@mui/material';
import { ReactComponent as InfoBlueIcon } from '../../../assets/images/icons/InfoBlueIcon.svg';
import InfoDrawer from '../../Common/InfoDrawer';
import VoltageSpecsParameterDrawer from '../DrawerText/VoltagespecsparameterDrawer';
import DriveCycleDrawer from '../DrawerText/DrivecycleDrawer';
import LoadingAll from '../loading';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';

const VoltageSpecification = ({ handlePrevious, handleNext}) => {
  const [loading, setLoading] = useState(false);  // Set loading to false as no API call is made
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpenDC, setDrawerOpenDC] = useState(false);

  const handleInfoClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleInfoClickDC = () => {
    setDrawerOpenDC(true);
  };

  const handleDrawerCloseDC = () => {
    setDrawerOpenDC(false);
  };

  // Hardcoded values instead of fetching from API
  const vehicleParametersData = [
    { parameterName: 'Voltage DC', parameterValue: 400, parameterDescription: 'V' },
    { parameterName: 'Current DC max', parameterValue: 300, parameterDescription: 'A' },
    { parameterName: 'K<sub>e</sub>', parameterValue: 0.85, parameterDescription: 'Vs/rad' },
    { parameterName: 'K<sub>-e</sub>', parameterValue: 0.75, parameterDescription: 'V/Krpm' },
    { parameterName: 'K<sub>t</sub>', parameterValue: 0.65, parameterDescription: 'Nm/A_rms' },
    { parameterName: 'Max A_rms', parameterValue: 250, parameterDescription: 'A' },
    { parameterName: 'Efficiency', parameterValue: 90, parameterDescription: 'Efficiency of the motor' },
    { parameterName: 'Torque', parameterValue: 50, parameterDescription: 'Torque at motor output' },
    { parameterName: 'Speed', parameterValue: 3500, parameterDescription: 'Speed in RPM' },
    { parameterName: 'Gradient', parameterValue: 15, parameterDescription: 'Vehicle gradient' },
    { parameterName: 'Speed (Kmph)', parameterValue: 120, parameterDescription: 'Vehicle speed in Kmph' },
  ];

  if (loading) return <LoadingAll heightOfLoading='40.289vh' widthOfLoading='75.611vw' />;

  // Filter data for the left table
  const parameterOrder = [
    'Voltage DC',
    'Current DC max',
    'K<sub>e</sub>',
    'K<sub>-e</sub>',
    'K<sub>t</sub>',
    'Max A_rms'
  ];

  const filteredParameters = vehicleParametersData
    ?.filter(item => parameterOrder.includes(item.parameterName))
    ?.sort((a, b) => parameterOrder.indexOf(a.parameterName) - parameterOrder.indexOf(b.parameterName));

  // Map data for the right table
  const efficiency = vehicleParametersData.find(item => item.parameterName === 'Efficiency');
  const torque = vehicleParametersData.find(item => item.parameterName === 'Torque');
  const speedRpm = vehicleParametersData.find(item => item.parameterName === 'Speed');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start',padding:'20px' }}>

      <div style={{ display: 'flex', gap: '280px' }}>

        {/* Left Table */}
        <div style={{ border: '1px solid #B4B4B4', borderRadius: '8px', overflow: 'hidden', width: '350px', height: '316.9px', overflowY: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F0F7FD', borderBottom: '1px solid #B4B4B4' }}>
                <th style={{ padding: '10px 30px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0069BD'}}>
                  Parameter
                  <IconButton onClick={handleInfoClick} size="small" style={{ color: '#0069BD', marginLeft: '8px' }}>
                    <InfoBlueIcon style={{height:'16px', width: '16px'}} />
                  </IconButton>
                  <InfoDrawer open={drawerOpen} onClose={handleDrawerClose} infoTitle={''} infoText={<VoltageSpecsParameterDrawer />} />
                </th>
                <th style={{ padding: '10px 30px', textAlign: 'right', fontWeight: '600', fontSize: '14px', color: '#0069BD' }}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredParameters && filteredParameters.map((item, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'white' }}>
                  <td style={{ color: '#222222', padding: '10px 30px', borderBottom: index === filteredParameters.length - 1 ? 'none' : '1px solid #B4B4B4', fontWeight: '500' }}>
                    <span dangerouslySetInnerHTML={{ __html: item.parameterName }} />
                    (<strong>{item.parameterDescription}</strong>)
                  </td>
                  <td style={{ color: '#222222', padding: '10px 30px', borderBottom: index === filteredParameters.length - 1 ? 'none' : '1px solid #B4B4B4', textAlign: 'right' }}>
                    {item.parameterValue} {/* Display the value directly without rounding */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Table */}
        <div style={{ border: '1px solid #B4B4B4', borderRadius: '8px', overflow: 'hidden', width: '30vw',height:'27.4vh' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F0F7FD' }}>
                <th colSpan="2" style={{ padding: '10px 30px', textAlign: 'center', fontWeight: '600', fontSize: '14px', color: '#0069BD', borderBottom: '1px solid #B4B4B4' }}>
                  Drive-cycle Performance
                  <IconButton onClick={handleInfoClickDC} size="small" style={{ color: '#0069BD', marginLeft: '8px' }}>
                    <InfoBlueIcon style={{height:'16px', width: '16px'}} />
                  </IconButton>
                  <InfoDrawer open={drawerOpenDC} onClose={handleDrawerCloseDC} infoTitle={''} infoText={<DriveCycleDrawer />} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{color: '#222222', padding: '10px 30px', borderBottom: '1px solid #B4B4B4', fontWeight: '500' }}>Efficiency <strong>(Wh/km)</strong></td>
                <td style={{color: '#222222', padding: '10px 30px', borderBottom: '1px solid #B4B4B4' }}>
                  {efficiency ? `${efficiency.parameterValue} (without regen)` : 'N/A'}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{color: '#222222', padding: '10px 30px', textAlign: 'center', fontWeight: '600', backgroundColor: '#F0F7FD', borderBottom: '1px solid #B4B4B4' }}>
                Average Motor Operating Point
                </td>
              </tr>
              <tr>
                <td style={{color: '#222222', padding: '10px 30px', borderBottom: '1px solid #B4B4B4', fontWeight: '500' }}>Torque <strong>(Nm)</strong></td>
                <td style={{color: '#222222', padding: '10px 30px', borderBottom: '1px solid #B4B4B4' }}>
                  {torque ? `${torque.parameterValue}` : 'N/A'}
                </td>
              </tr>
              <tr>
                <td style={{color: '#222222', padding: '10px 30px', fontWeight: '500' }}>Speed <strong>(RPM)</strong></td>
                <td style={{color: '#222222', padding: '10px 30px',}}>
                  {speedRpm ? `${speedRpm.parameterValue}` : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
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

export default VoltageSpecification;
