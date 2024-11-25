import React, { useEffect, useState } from 'react';
import { dotWave } from 'ldrs'; // Importing the dotWave library
import loadingsimulationgif from '../../../assets/images/loadingsimulation.gif'; // Path to your GIF

const LoadingGif = () => {
  const [loadingMessage, setLoadingMessage] = useState(''); // State for the loading message
  const [loadingProgress, setLoadingProgress] = useState(0); // State for the loading percentage
  const [waveColor, setWaveColor] = useState('#000000'); // State for the dotWave color, starting with black

  // Register the dotWave component when the component mounts
  useEffect(() => {
    dotWave.register();

    // Simulate loading progress updates
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 25;
        if (newProgress > 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 27500); 

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (loadingProgress <= 25) {
      setLoadingMessage('Hold tight! We’re crunching the numbers...');
      setWaveColor('#0069bd'); // Blue color for the first message
    } else if (loadingProgress <= 50) {
      setLoadingMessage('Halfway there! Precision in progress...');
      setWaveColor('#222222'); // Black color for the second message
    } else if (loadingProgress <= 75) {
      setLoadingMessage('Fine-tuning the details...');
      setWaveColor('#0069bd'); // Blue color for the third message
    } else if (loadingProgress <= 100) {
      setLoadingMessage('Almost done! Your custom motor design is on the way...');
      setWaveColor('#222222'); // Black color for the fourth message
    } 
  }, [loadingProgress]);

  // Separate useEffect for the fifth message after 1 minute 50 seconds (110 seconds)
  useEffect(() => {
    if (loadingProgress === 100) {
      const fifthMessageTimeout = setTimeout(() => {
        setLoadingMessage("Things are taking a bit longer than expected. Sit back, relax, and it'll be ready soon!");
        setWaveColor('#0069bd'); // Blue color for the fifth message
      }, 20000); // 27.5 seconds delay for the fifth message after progress reaches 100%

      return () => clearTimeout(fifthMessageTimeout);
    }
  }, [loadingProgress]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', overflow: 'hidden', marginTop: '50px' }}>

      <img src={loadingsimulationgif} alt="Loading..." style={{ height: 'auto', maxHeight: '60vh', marginBottom: '20px' }} />

      <l-dot-wave
        size="47"
        speed="1.4"
        color={waveColor}
        style={{ height: 'auto', maxHeight: '30vh', marginBottom: '30px' }} // Ensure it's styled appropriately
      ></l-dot-wave>

      <p style={{ fontWeight: '500', fontSize: '16px', marginBottom: '80px', textAlign: 'center', color: '#222222' }}>
        {loadingMessage}
      </p>
    </div>
  );
};

export default LoadingGif;