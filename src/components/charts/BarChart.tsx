'use client'
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ChartData } from 'chart.js';

interface BarChartProps {
  data?: ChartData<'bar'>;
}

const BarChart = ({ data = {
  labels: ['January', 'February', 'March', 'April', 'May',"June","July","August","September","October","November","December"],
  datasets: [{
    label: 'Sample Data',
    data: [65, 59, 80, 81, 56, 60, 99, 100, 90, 80, 70, 60],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
    ],
    borderWidth:1, 
  }]
} }: BarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Cleanup function to destroy previous chart instance
    const cleanup = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };

    // Get the canvas context
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    cleanup();
    
    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Bar Chart Example'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup on component unmount
    return cleanup;
  }, [data]);

  return (
    <div >
      <canvas className='h-[40vh] lg:h-[40vh] max-w-full w-full' ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;