import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import dragData from 'chartjs-plugin-dragdata';

Chart.register(...registerables, dragData);

const defaultDataPoints = [
  { x: 0, y: 0 },
  { x: 18, y: 0 },
  { x: 25, y: 25 },
  { x: 30, y: 15 },
  { x: 32, y: 15 },
  { x: 42, y: 33 },
  { x: 52, y: 20 },
  { x: 90, y: 42 },
  { x: 108, y: 0 }
];

const LineChartDC = ({ isEditable }) => {
  const chartRef = useRef(null);
  const [dataPoints, setDataPoints] = useState(defaultDataPoints);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Speed',
          data: dataPoints,
          borderColor: '#36a2eb',
          backgroundColor: '#36a2eb55',
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#ff6384',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Time (seconds)',
              color: '#333',
              font: {
                size: 16,
                family: 'Roboto, sans-serif',
                weight: 'bold'
              }
            },
            grid: {
              color: '#e9e9e9'
            },
            ticks: {
              color: '#333'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Speed (km/h)',
              color: '#333',
              font: {
                size: 16,
                family: 'Roboto, sans-serif',
                weight: 'bold'
              }
            },
            grid: {
              color: '#e9e9e9'
            },
            ticks: {
              color: '#333'
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#333',
              font: {
                size: 14,
                family: 'Roboto, sans-serif'
              }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1,
            titleFont: {
              size: 14,
              family: 'Roboto, sans-serif'
            },
            bodyFont: {
              size: 12,
              family: 'Roboto, sans-serif'
            },
            padding: 10,
            callbacks: {
              title: function(context) {
                return '';
              },
              label: function(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.raw.y + ', Time: ' + context.raw.x;
                return label;
              }
            }
          },
          dragData: {
            round: 0,
            showTooltip: true,
            dragX: true,
            onDragStart: function(e, datasetIndex, index, value) {
              if (!isEditable || index === 0 || index === dataPoints.length - 1) {
                e.preventDefault();
                return false;
              }
            },
            onDrag: function(e, datasetIndex, index, value) {
              if (!isEditable || index === 0 || index === dataPoints.length - 1) return false;

              var pointBefore = dataPoints[index - 1].x;
              var pointAfter = dataPoints[index + 1].x;

              if (value.x <= pointBefore) {
                value.x = pointBefore + 1;
              }
              if (value.x >= pointAfter) {
                value.x = pointAfter - 1;
              }

              dataPoints[index].x = value.x;
              dataPoints[index].y = value.y;
              chartInstance.update();
            },
            onDragEnd: function(e, datasetIndex, index, value) {
              if (!isEditable || index === 0 || index === dataPoints.length - 1) return false;

              dataPoints[index].x = value.x;
              dataPoints[index].y = value.y;
              setDataPoints([...dataPoints]); // Update state to trigger re-render

              chartInstance.options.scales.y.min = 0;
              chartInstance.options.scales.y.max = Math.max(...dataPoints.map(point => point.y)) + 10;
              chartInstance.update();
            }
          }
        }
      }
    });

    return () => {
      chartInstance.destroy();
    };
  }, [dataPoints, isEditable]);

  return (
    <div style={{ width: '700px', height: '370px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChartDC;
