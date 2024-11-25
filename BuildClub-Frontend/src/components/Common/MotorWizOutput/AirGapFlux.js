import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';
import { Button } from '@mui/material';
import { ReactComponent as ArrowBackIcon } from '../../../assets/images/icons/previousleft.svg';
import { ReactComponent as ArrowForwardIcon } from '../../../assets/images/icons/nextright.svg';
import Loading from '../../Common/loading';
import axios from 'axios';
import base_url from '../../../services/api';

const AirgapPlot = ({ handlePrevious, handleNext }) => {
  const [plotData, setPlotData] = useState(null);
  const [animatedData, setAnimatedData] = useState(null);
  const animationFrameRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
        try {  
            const user_id = sessionStorage.getItem('user_id');
            const vehicle_name = localStorage.getItem('applicationName');
  
            const response = await axios.post(base_url+'/get_motor_data', {
                user_id: user_id,
                vehicle_name: vehicle_name,
                motor_name: vehicle_name + '_Motor',
            });

            console.log('API Response:', response.data);

            if (response.data.status === 'finished') {
                const data = response.data.output.airgap_plot; // Access airgap_plot from response
                const airgap_fundamental = data.fundamental;
                const airgap_original = data.original;

                const fb = airgap_fundamental.b;
                const fl = airgap_fundamental.length;
                const ob = airgap_original.b;
                const ol = airgap_original.length;

                const createObject = (arr1, arr2) => {
                    const result = [];
                    let b_max = -1;

                    for (let i = 0; i < arr1.length; i++) {
                        if (b_max < arr2[i]) {
                            b_max = arr2[i];
                        }
                        result.push({ x: arr1[i], y: arr2[i] });
                    }
                    return [result, b_max];
                };

                const getBHorizontalLine = (b_max) => {
                    const bpk = [];
                    const bav = [];

                    for (let i = 0; i < fl.length; i++) {
                        bpk.push(b_max);
                        bav.push((b_max * 2) / 3.14159); // Assuming this formula is correct
                    }
                    return [bpk, bav];
                };

                const [airgap_values_fundamental, b_max1] = createObject(fl, fb);
                const [airgap_values_original, b_max2] = createObject(ol, ob);
                const [bpk, bav] = getBHorizontalLine(b_max1);
                const [airgap_values_bpk] = createObject(fl, bpk);
                const [airgap_values_bav] = createObject(fl, bav);

                const plotData = {
                    fundamental: airgap_values_fundamental,
                    original: airgap_values_original,
                    bpk: airgap_values_bpk,
                    bav: airgap_values_bav,
                };
                console.log('Data fetched successfully');

                setPlotData(plotData);
            } else {
                console.error('Data not ready yet. Status:', response.data.status);
            }
        } catch (error) {
            console.error('Error fetching motor data:', error);
        }
        finally
        {
          setLoading(false);
        }
    };

    fetchData();
}, []);

  useEffect(() => {
    if (plotData) {
      const frames = 100;
      const updateInterval = 2; // Time in milliseconds between updates
      let frame = 0;

      const animate = () => {
        if (frame < frames) {
          setAnimatedData({
            fundamental: plotData.fundamental.slice(0, Math.floor(frame * plotData.fundamental.length / frames)),
            original: plotData.original.slice(0, Math.floor(frame * plotData.original.length / frames)),
            bpk: plotData.bpk.slice(0, Math.floor(frame * plotData.bpk.length / frames)),
            bav: plotData.bav.slice(0, Math.floor(frame * plotData.bav.length / frames)),
          });
          frame++;
          animationFrameRef.current = setTimeout(animate, updateInterval);
        }
      };

      animate();
      
      return () => clearTimeout(animationFrameRef.current);
    }
  }, [plotData]);

  if (!animatedData) {
    return <Loading/>
  }

  const fundamentalTrace = {
    x: animatedData.fundamental.map((d) => d.x),
    y: animatedData.fundamental.map((d) => d.y),
    type: 'scatter',
    mode: 'lines',
    name: 'Flux Density (Fundamental)',
    line: { color: 'orange' },
    hovertemplate: '<b>Fundamental</b><br>Degree: %{x}<br>IBI: %{y}<extra></extra>'
  };

  const originalTrace = {
    x: animatedData.original.map((d) => d.x),
    y: animatedData.original.map((d) => d.y),
    type: 'scatter',
    mode: 'lines',
    name: 'Flux Density',
    line: { color: 'blue' },
    hovertemplate: '<b>Flux Density</b><br>Degree: %{x}<br>IBI: %{y}<extra></extra>'
  };

  const bpkTrace = {
    x: animatedData.bpk.map((d) => d.x),
    y: animatedData.bpk.map((d) => d.y),
    type: 'scatter',
    mode: 'lines',
    name: 'B Peak',
    line: { color: 'green' },
    hovertemplate: '<b>B Peak</b><br>Degree: %{x}<br>IBI: %{y}<extra></extra>'
  };

  const bavTrace = {
    x: animatedData.bav.map((d) => d.x),
    y: animatedData.bav.map((d) => d.y),
    type: 'scatter',
    mode: 'lines',
    name: 'B Average',
    line: { color: 'yellow' },
    hovertemplate: '<b>B Average</b><br>Degree: %{x}<br>IBI: %{y}<extra></extra>'
  };

  const layout = {
    xaxis: {
      title: {
        text: 'Angle (Degrees)',
        font: {
          family: 'Poppins',
          size: 16,
          color: '#0069BD',   // Ensure the color is applied
          weight: '600'
        }
      },
    },
    yaxis: {
      title: {
        text:  'IBI (Tesla)',
        font: {
          family: 'Poppins',
          size: 16,
          color: '#0069BD',   // Ensure the color is applied
          weight: '600'
        }
      },
    },
  };

  const style = {
    width: '70vw'
  };
  if (loading) return <Loading />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
      <Plot 
        style={style}
        data={[fundamentalTrace, originalTrace, bpkTrace, bavTrace]}
        layout={layout}
        config={{
          displayModeBar: true, // Ensure the mode bar is displayed
          displaylogo: false, // Hide the Plotly logo
          modeBarButtonsToRemove: [
            'pan2d',
            'zoomIn2d',
            'zoomOut2d',
            'autoscale',
            'resetScale2d',
            'zoom2d'
          ], // Remove specific buttons
        }}
      />

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

export default AirgapPlot;
