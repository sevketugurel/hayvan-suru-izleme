import React, { useEffect, useRef } from 'react';
import { Panel } from '../';
import Chart from 'chart.js/auto';

// Örnek yem tüketim verileri - gerçek uygulamada API'den gelecektir
const feedData = {
  labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
  consumption: [850, 880, 820, 840, 830, 810, 860],
  average: 841.4,
  totalWeek: 5890,
  trend: 'stable', // 'increasing', 'decreasing', 'stable'
  perAnimal: 42.3,
  costPerDay: 1240
};

const FeedConsumptionPanel: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance: Chart | null = null;
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Eğer bir chart instance varsa yok et
        if (chartInstance) {
          chartInstance.destroy();
        }
        
        // Yeni chart oluştur
        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: feedData.labels,
            datasets: [{
              label: 'Günlük Yem Tüketimi (kg)',
              data: feedData.consumption,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
              tension: 0.2,
              borderWidth: 2,
              pointRadius: 3,
              pointBackgroundColor: '#3b82f6'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                titleFont: {
                  size: 12
                },
                bodyFont: {
                  size: 12
                },
                padding: 10,
                boxPadding: 4,
                boxWidth: 8,
                boxHeight: 8,
                usePointStyle: true,
                callbacks: {
                  label: function(context) {
                    return `Tüketim: ${context.parsed.y} kg`;
                  }
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#6b7280',
                  font: {
                    size: 10
                  }
                }
              },
              y: {
                beginAtZero: false,
                min: Math.min(...feedData.consumption) - 50,
                max: Math.max(...feedData.consumption) + 50,
                grid: {
                  color: 'rgba(107, 114, 128, 0.1)'
                },
                ticks: {
                  color: '#6b7280',
                  font: {
                    size: 10
                  }
                }
              }
            }
          }
        });
      }
    }
    
    // Clean up
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);
  
  // Trend gösterge ikonu
  const getTrendIcon = () => {
    switch(feedData.trend) {
      case 'increasing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{color: '#10b981'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'decreasing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{color: '#9333ea'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{color: '#f59e0b'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };
  
  return (
    <Panel 
      title="Yem Tüketimi"
      linkTo="/reports/feed"
      colorType="blue"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      }
    >
      <div className="feed-panel">
        <div className="feed-chart">
          <canvas ref={chartRef} className="feed-chart-canvas"></canvas>
        </div>
        
        <div className="feed-stats">
          <div className="feed-stat-item">
            <div className="feed-stat-title">Günlük Ortalama</div>
            <div className="feed-stat-value">{feedData.average.toFixed(1)} kg</div>
          </div>
          
          <div className="feed-stat-item">
            <div className="feed-stat-title">Haftalık Toplam</div>
            <div className="feed-stat-value">{feedData.totalWeek} kg</div>
          </div>
          
          <div className="feed-stat-item">
            <div className="feed-stat-title">Hayvan Başına</div>
            <div className="feed-stat-value">{feedData.perAnimal.toFixed(1)} kg</div>
          </div>
          
          <div className="feed-stat-item">
            <div className="feed-stat-title">Günlük Maliyet</div>
            <div className="feed-stat-value">{feedData.costPerDay} ₺</div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default FeedConsumptionPanel; 