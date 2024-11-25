import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as InfoBlueIcon } from '../../../assets/images/icons/InfoBlueIcon.svg';
import InfoDrawer from '../../Common/InfoDrawer';
import TorqueSpeedDrawer from '../DrawerText/TorquespeedDrawer';
import './TorqueSpeedTable.css'; // Import your CSS file if needed

const TorqueSpeedTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleInfoClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const hardcodedData = [
    { PeakMode: 'Peak Torque', Speed: 1500, Torque: 200, Power: 75 },
    { PeakMode: 'Peak Power', Speed: 2000, Torque: 180, Power: 90 },
    { PeakMode: 'Peak Speed', Speed: 2500, Torque: 160, Power: 100 },
    { PeakMode: 'No Load Speed', Speed: 3000, Torque: 140, Power: 120 },
    { PeakMode: 'Rated Operating Point', Speed: 3500, Torque: 120, Power: 110 },
  ];

  return (
    <div style={{ border: '1px solid #B4B4B4', borderRadius: '8px', overflow: 'hidden', width: '554px', height: '310px', overflowY: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#F0F7FD', borderBottom: '1px solid #B4B4B4' }}>
            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0069BD' }}>
              Peak Mode
              <IconButton onClick={handleInfoClick} size="small" style={{ color: '#0069BD', marginLeft: '8px' }}>
                <InfoBlueIcon style={{ height: '16px', width: '16px' }} />
              </IconButton>
              <InfoDrawer open={drawerOpen} onClose={handleDrawerClose} infoTitle={''} infoText={<TorqueSpeedDrawer />} />
            </th>
            <th style={{ padding: '15px', textAlign: 'right', fontWeight: '600', fontSize: '14px', color: '#0069BD' }}>
              Speed (RPM)
            </th>
            <th style={{ padding: '15px', textAlign: 'right', fontWeight: '600', fontSize: '14px', color: '#0069BD' }}>
              Torque (Nm)
            </th>
            <th style={{ padding: '15px', textAlign: 'right', fontWeight: '600', fontSize: '14px', color: '#0069BD' }}>
              Power (kW)
            </th>
          </tr>
        </thead>
        <tbody>
          {hardcodedData.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'white' }}>
              <td style={{ color: '#222222', padding: '15px', borderBottom: index === hardcodedData.length - 1 ? 'none' : '1px solid #B4B4B4', fontSize: '14px', fontWeight: '500' }}>
                {item.PeakMode}
              </td>
              <td style={{ color: '#222222', padding: '15px', borderBottom: index === hardcodedData.length - 1 ? 'none' : '1px solid #B4B4B4', fontSize: '14px', fontWeight: '500', textAlign: 'right' }}>
                {item.Speed.toFixed(2)}
              </td>
              <td style={{ color: '#222222', padding: '15px', borderBottom: index === hardcodedData.length - 1 ? 'none' : '1px solid #B4B4B4', fontSize: '14px', fontWeight: '500', textAlign: 'right' }}>
                {item.Torque.toFixed(2)}
              </td>
              <td style={{ color: '#222222', padding: '15px', borderBottom: index === hardcodedData.length - 1 ? 'none' : '1px solid #B4B4B4', fontSize: '14px', fontWeight: '500', textAlign: 'right' }}>
                {item.Power.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TorqueSpeedTable;
