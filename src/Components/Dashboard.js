import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Chart from 'chart.js/auto';
import { LinearScale } from 'chart.js';
import MonkeyImg from "../Images/monkey.jpg"


const Dashboard = () => {
  const [items, setItems] = useState([]);
 
  useEffect(() => {
    // fetch items from API
    fetch('http://localhost:4000/api/items')
      .then(response => response.json())
      .then(data => {
        const dataArray = Object.values(data); // convert object to array
        setItems(dataArray);
        console.log(dataArray)
        console.log(dataArray.image)
      });
  }, []);


  if (!Array.isArray(items)) {
    return <div>Loading...</div>;
  }
  const chartData = {
    labels: items.map(item => item.title),
    datasets: [
      {
        label: 'Unique Plays',
        data: items.map(item => item.unique_plays),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Total Plays',
        data: items.map(item => item.total_plays),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      },
    },
  };

  // Register the linear scale
  Chart.register(LinearScale);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className='lineChat'>
      <Line data={chartData} options={options} />
      </div>
      <div className="items-container">
        {items.map(item => (
          <div className="item" key={item.id}>
            <img className="thumbnail" src={MonkeyImg} alt={item.title} style={{with:100,height:100}} />
            <h3 className="title">{item.title}</h3>
            <div className='CompletionRate'>
                <span className="label" style={{ display: 'inline-block' }}>completion_rate:  </span>
                 <ProgressBar now={item.completion_rate} label={`${item.completion_rate}%`} style={{ display: 'inline-block' }} />
            </div>
            <div className="plays">
              <div className="unique-plays">
                <span className="label">Unique Plays: </span>
                <span className="value">{item.unique_plays}</span>
              </div>
              <div className="total-plays">
                <span className="label">Total Plays: </span>
                <span className="value">{item.total_plays}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
