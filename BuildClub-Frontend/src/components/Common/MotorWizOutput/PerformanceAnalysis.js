import React, { useState,useEffect } from 'react';
import EfficiencyPlot from '../PerformanceAnalysisCharts/EfficiencyPlotMain';
import WindingTemp from '../PerformanceAnalysisCharts/WindingTemperaturePlotMain';
import TorqueSpeed from '../PerformanceAnalysisCharts/TorquevsSpeed';
import MotorConstraints from '../PerformanceAnalysisCharts/MotorConstraintCurves';
import MaxTorque from '../PerformanceAnalysisCharts/MaxTorqueTrajectory';
import MTPATable from '../PerformanceAnalysisCharts/MTPATable';
import { Button } from '@mui/material';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import Loading from '../../Common/loading';
import InfoDrawer from '../../Common/InfoDrawer'; 
import { IconButton } from '@mui/material';
import { ReactComponent as InfoIcon } from '../../../assets/images/icons/InfoBlueIcon.svg';
import axios from 'axios';
import PerformanceAnalysisDrawer from '../info_drawer/PerformanceAnalysisDrawer';
import base_url from '../../../services/api';
import OperatingControl from '../PerformanceAnalysisCharts/OperatingControl';

const PerformanceAnalysis = ({ handlePrevious, handleNext }) => {
  const [activeComponent, setActiveComponent] = useState('torqueSpeed');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const fetchMotorData = async () => {
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
                    { parameter: <><span>L<sub>d</sub></span> <b>(μΗ)</b></>, value: Math.round(outputData.ldlq[0]) },
                    { parameter: <><span>L<sub>q</sub></span> <b>(μΗ)</b></>, value: Math.round(outputData.ldlq[1]) },
                    { parameter: <>Ψm <b>(Wb)</b></>, value:  Math.round(outputData.ldlq[2]) },
                    { parameter: <><span>K<sub>e</sub></span><b>(V/krpm)</b></>, value: Math.round(outputData.bemf) },
                    { parameter: <><span>K<sub>t</sub></span><b>(Nm/A)</b></>, value: Math.round(outputData.kt) },
                    { parameter: <>Max A_rms<b>(A)</b></>, value: Math.round(outputData.i_max) },
                ];

                setTableData(fetchedTableData);
            }
        } catch (error) {
            console.error('Error fetching motor data:', error);
        }
        finally {
          setLoading(false); 
        }
    };

    fetchMotorData();
}, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'torqueSpeed':
        return <TorqueSpeed />;
      case 'efficiency':
        return <EfficiencyPlot />;
      case 'windingTemp':
        return <WindingTemp />;
      case 'motorConstraints':
        return <MotorConstraints />;
      case 'maxTorque':
        return <MaxTorque />;
      case 'mtpaTable':
        return <MTPATable />;
        case 'operatingcontrol':
          return <OperatingControl />;
      default:
        return <TorqueSpeed />;
    }
  };

  const buttonStyle = {
    display: 'block',
    fontSize: 'clamp(8.53px, 0.833vw, 15.468px)',
    fontWeight:'500',
    width: '222px',
    height: '32px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    border: '1px solid #B4B4B4',
    cursor: 'pointer',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0069BD',
    color: '#fff',
  };
  if (loading) return <Loading />;
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{ display: 'flex', padding: '20px' }}>
        <div className='firstHalf'>
          <div className='topTable'>
            <div style={{ borderRadius: '5px',border:'1px solid #b4b4b4',overflowY:'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse'  }}>
  <thead>
    <tr>
      <th style={{ fontSize: '14px', padding: '1vh 2vw', backgroundColor: '#E0F0FF', fontWeight: 600, borderBottom: '1px solid #b4b4b4' }}>
        Parameter
        <IconButton
        style={{color:'#0069db', marginLeft:'6px'}}
          onClick={() => setDrawerOpen(true)} // Open the drawer on click
        >
          <InfoIcon  style={{  height:'16px', width:'16px' }}   />
        </IconButton>
      </th>
      <th style={{ fontSize: '14px', padding: '1vh 2vw', backgroundColor: '#E0F0FF', fontWeight: 600, borderBottom: '1px solid #b4b4b4', textAlign:'right' }}>
        Value
      </th>
    </tr>
  </thead>
  <tbody>
    {tableData.map((row, index) => (
      <tr key={index}>
        <td
          style={{
            fontSize: '14px',
            padding: '1vh 2vw',
            borderBottom: index === tableData.length - 1 ? 'none' : '1px solid #B4B4B4',
          }}
        >
          {row.color && (
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: row.color,
                marginRight: '10px',
                borderRadius: '50%',
              }}
            ></span>
          )}
          {row.parameter}
        </td>
        <td
          style={{
            fontSize: '14px',
            padding: '1vh 2vw',
            textAlign:'right',
            borderBottom: index === tableData.length - 1 ? 'none' : '1px solid #B4B4B4',
          }}
        >
          {row.value}
        </td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
          </div>
          <br/>
          <div style={{ display: 'flex', border: '1px solid rgb(221, 221, 221)', borderRadius: '5px', height: '308px', width: '275px', padding: '18px 26px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <button
                style={activeComponent === 'torqueSpeed' ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveComponent('torqueSpeed')}
              >
                Torque vs Speed
              </button>
              <button
                style={activeComponent === 'efficiency' ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveComponent('efficiency')}
              >
                Efficiency Plot
              </button>
              <button
                style={activeComponent === 'windingTemp' ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveComponent('windingTemp')}
              >
                Winding Temperature Plot
              </button>
              <button
                style={activeComponent === 'motorConstraints' ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveComponent('motorConstraints')}
              >
                Motor Constraint Curves
              </button>
              <button
                style={activeComponent === 'maxTorque' ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveComponent('maxTorque')}
              >
                Max Torque Trajectory
              </button>
              <button
                style={activeComponent === 'mtpaTable' ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveComponent('mtpaTable')}
              >
                MTPA Table
              </button>
              <button
                style={activeComponent === 'operatingcontrol' ? activeButtonStyle : buttonStyle}
                onClick={() => setActiveComponent('operatingcontrol')}
              >
              Operational system
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: '555px', height: '400px', marginLeft: '50px' }}>
          <div style={{ flex: 3, padding: '20px' }}>
            {renderComponent()}
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
        infoText={<PerformanceAnalysisDrawer />} 
        />
  </div>
  );
};

export default PerformanceAnalysis;
