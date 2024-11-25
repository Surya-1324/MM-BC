import React, { useState } from 'react';

const ApplicationInput = () => {
  const [selectedDuty, setSelectedDuty] = useState('continuous');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDutyChange = (event) => {
    setSelectedDuty(event.target.value);
  };

  const handleFocus = (id) => {
    setFocusedInput(id);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const inputStyle = (id) => ({
    width: '275px',
    height: '40px',
    border: `1px solid ${focusedInput === id ? '#0069bd' : 'grey'}`,
    borderRadius: '4px',
    outline: 'none',
    padding: '8px', // Padding inside the input field
  });

  const containerStyle = {
    width: '870px',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '0 auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    backgroundColor: '#f5faff',
    fontWeight: '500',
    color: '#0069bd', // Updated color
    padding: '8px',
    borderBottom: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '12px', // Padding for table cells
    borderBottom: '1px solid #ddd',
  };

  const radioStyle = {
    marginRight: '8px',
  };

  const labelStyle = {
    fontWeight: '500',
    color: '#222222',
  };

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Duty</th>
            <th style={thStyle}>Motor Torque</th>
            <th style={thStyle}>Shaft Speed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>
              <input
                type="radio"
                checked={selectedDuty === 'continuous'}
                onChange={handleDutyChange}
                value="continuous"
                name="duty-radio-button"
                style={radioStyle}
              />
              <span style={labelStyle}>Continuous</span>
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input1')}
                onFocus={() => handleFocus('input1')}
                onBlur={handleBlur}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input2')}
                onFocus={() => handleFocus('input2')}
                onBlur={handleBlur}
              />
            </td>
          </tr>
          <tr>
            <td style={tdStyle}></td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input3')}
                onFocus={() => handleFocus('input3')}
                onBlur={handleBlur}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input4')}
                onFocus={() => handleFocus('input4')}
                onBlur={handleBlur}
              />
            </td>
          </tr>
          <tr>
            <td style={tdStyle}>
              <input
                type="radio"
                checked={selectedDuty === 'short-term'}
                onChange={handleDutyChange}
                value="short-term"
                name="duty-radio-button"
                style={radioStyle}
              />
              <span style={labelStyle}>Short-Term</span>
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input5')}
                onFocus={() => handleFocus('input5')}
                onBlur={handleBlur}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input6')}
                onFocus={() => handleFocus('input6')}
                onBlur={handleBlur}
              />
            </td>
          </tr>
          <tr>
            <td style={tdStyle}></td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input7')}
                onFocus={() => handleFocus('input7')}
                onBlur={handleBlur}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                style={inputStyle('input8')}
                onFocus={() => handleFocus('input8')}
                onBlur={handleBlur}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationInput;
