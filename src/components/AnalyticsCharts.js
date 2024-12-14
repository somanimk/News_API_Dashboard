import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AnalyticsCharts = ({ articles }) => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const barCtx = barChartRef.current.getContext('2d');
    const pieCtx = pieChartRef.current.getContext('2d');

    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: articles.map(a => new Date(a.publishedAt).toLocaleDateString()),
        datasets: [{
          label: 'Articles per Day',
          data: articles.map(a => 1), 
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Source A', 'Source B'], 
        datasets: [{
          label: 'Source Distribution',
          data: [30, 70], 
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'point',
            intersect: true
          },
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, [articles]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ flex: 1, padding: '10px' }}>
        <canvas ref={barChartRef} style={{ width: '100%', height: '300px' }}></canvas>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <canvas ref={pieChartRef} style={{ width: '100%', height: '300px' }}></canvas>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
