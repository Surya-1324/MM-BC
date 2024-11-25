import React, { useState } from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel, IconButton, Tooltip, InputAdornment } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';
import InfoDrawer from './InfoDrawer'; // Import the InfoDrawer component

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-icon': {
    right: '50px', // Move the dropdown arrow 10px to the left of its default position
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px', // Set input box radius to 8px
  },
}));

const DropdownInputField = ({ label, value, onChange, options, info, readOnly }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center',}}>
        <FormControl 
          fullWidth
          disabled={readOnly} 
          variant="outlined" 
          sx={{ 
            margin: '20px', 
            width: '363px',
            height: '56px',
            '& .MuiOutlinedInput-root': { 
              borderRadius: '8px',
              height: '100%',
              paddingRight: '26px',
            },
            '& .MuiSelect-select': {
              padding: '12px 14px', // Adjust padding as needed
            }
          }}
        >
          <InputLabel sx={{ color: '#0069BD' }}>{label}</InputLabel>
          <CustomSelect
            value={value}
            onChange={onChange}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title={info.hover}>
                  <IconButton edge="end" onClick={toggleDrawer}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </Grid>

      <InfoDrawer open={isDrawerOpen} onClose={toggleDrawer} content={info} />
    </>
  );
};

export default DropdownInputField;
