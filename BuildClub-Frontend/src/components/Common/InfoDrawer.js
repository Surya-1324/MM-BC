import React from 'react';
import { Drawer, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const InfoDrawer = ({ open, onClose, infoTitle, infoText }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: '40vw',  // 40% of viewport width
          minWidth: '300px', // Minimum width to ensure readability
          maxWidth: '900px', // Maximum width to prevent it from being too wide
          height: '80vh',  // 80% of viewport height
          minHeight: '400px', // Minimum height for content area
          maxHeight: '900px', // Maximum height to prevent overflow
          padding: '2vw', // Padding in viewport units for responsiveness
        }}
      >
        <IconButton onClick={onClose} sx={{ marginLeft: 'auto' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" sx={{ marginTop: '2vh', color: '#0069BD', fontWeight: 600, fontSize: '2vw' }}>
          {infoTitle}
        </Typography>
        <Typography variant="div" sx={{ marginTop: '1vh', fontSize: '1.2vw' }}>
          {infoText}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default InfoDrawer;
