import React from 'react';

const tableData = [
  { parameter: 'Battery Voltage (V)', value: 48 },
  { parameter: 'Peak Torque (Nm)', value: 70 },
  { parameter: 'No Load Speed (RPM)', value: 1178 },
  { parameter: 'Max λ_rms (A)', value: 1394 },
];

const NonEVOutput = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0069BD'}}>Tabular View</h3>
        <div style={{ borderRadius: '5px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{fontSize: '14px', padding: '10px', backgroundColor: '#E0F0FF', fontWeight: 600, border: '1px solid #ddd' }}>Parameter</th>
                <th style={{fontSize: '14px', padding: '10px', backgroundColor: '#E0F0FF', fontWeight: 600, border: '1px solid #ddd' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td style={{fontSize: '14px', padding: '10px', border: '1px solid #ddd' }}>{row.parameter}</td>
                  <td style={{fontSize: '14px', padding: '10px', border: '1px solid #ddd' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NonEVOutput;
