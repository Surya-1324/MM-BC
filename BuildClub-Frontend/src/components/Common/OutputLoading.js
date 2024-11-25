import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import loading from '../../assets/images/loading.gif'; // Update the path to your GIF

export default function LinearBuffer() {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const progressRef = useRef(() => {});
  const theme = useTheme();

  useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress((prevProgress) => Math.min(prevProgress + diff, 100));
        setBuffer((prevBuffer) => Math.min(prevBuffer + diff + diff2, 100));
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        mt: 4,
      }}
    >
      <img 
        src={loading} 
        alt="Loading GIF" 
        style={{ width: '300px', height: '300px', marginBottom: '20px' }} 
      />
      <Box sx={{ width: '50%' }}>
        <LinearProgress 
          variant="buffer" 
          value={progress} 
          valueBuffer={buffer}
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#d6eaf9',
            },
            '& .MuiLinearProgress-bar1Buffer': {
              backgroundColor: '#004ba0',
            },
          }} 
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Loading: {Math.round(progress)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
