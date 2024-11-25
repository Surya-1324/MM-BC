// InputField.js
import React, { useState } from 'react';
import { TextField, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import InfoDrawer from './InfoDrawer';

const InputField = ({ label, value, onChange, infoHover, infoRange, infoTitle, infoText, readOnly, error, helperText }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleInfoClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px', width: '363px', height: '56px' }}>
      <TextField
        required
        type="number"
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="outlined"
        fullWidth
        disabled={readOnly}
        placeholder={infoRange}
        InputProps={{
          endAdornment: (
            <Tooltip title={infoHover}>
              <IconButton onClick={handleInfoClick}>
                <InfoIcon />
              </IconButton>
            </Tooltip>    
          ),
        }}
        InputLabelProps={{
          style: { color: '#0069BD', fontSize: '16px', fontWeight: 500 },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
      <InfoDrawer open={drawerOpen} onClose={handleDrawerClose} infoTitle={infoTitle} infoText={infoText} />
    </div>
  );
};

export default InputField;
