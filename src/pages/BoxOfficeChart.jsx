import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BoxOfficeChart() {
  const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   fetch("https://boxoffice.tfi.org.tw/api/export?start=2025/03/17&end=2025/03/23")
  //     .then(res => res.json())
  //     .then(data => {
  //       setChartData(data);
  //     });
  // }, []);
  useEffect(() => {
    async function loadData() {
      try {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = "https://boxoffice.tfi.org.tw/api/export?start=2025/03/17&end=2025/03/23";

        const res = await fetch('https://boxoffice.tfi.org.tw/api/export?start=2020/06/01&end=2020/06/07');
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const data = await res.json();
        console.log('✅ 成功資料:', data);
        setChartData(data);
      } catch (err) {
        console.error('❌ 抓取資料失敗:', err);
      }
    }

    loadData();
  }, []);

  const data = {
    labels: chartData.map(item => item.MovieName), // 電影名稱
    datasets: [
      {
        label: '票房收入',
        data: chartData.map(item => Number(item.BoxOffice.replace(/,/g, ''))), // 去掉逗號
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderRadius: 5
      }
    ]
  };

  return (
    <div>
      <h2>2025/03/17 - 2025/03/23 電影票房</h2>
      <Bar data={data} />
    </div>
  );
}
