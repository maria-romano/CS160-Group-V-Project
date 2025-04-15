// src/components/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const sampleData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 200 },
  { name: 'D', value: 100 }
];

function Dashboard() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const renderChart = (option) => {
    switch (option) {
      case 1:
        return (
          <BarChart width={400} height={300} data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 2:
        return (
          <LineChart width={400} height={300} data={sampleData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        );
      case 3:
        return (
          <PieChart width={400} height={300}>
            <Pie
              data={sampleData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {sampleData.map((_, index) => (
                <Cell key={index} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case 4:
        return (
          <BarChart width={400} height={300} data={sampleData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        );
      case 5:
        return (
          <LineChart width={400} height={300} data={sampleData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#FF0000" />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="chart-area">
        {selectedOptions.length === 0 ? (
          <p>Select options on the right to view charts.</p>
        ) : (
          <div className="chart-wrapper">
            {selectedOptions.map((option) => (
              <div key={option} className="chart-card">
                <h3>Chart for Option {option}</h3>
                {renderChart(option)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar">
        <h2>🛠 Customize Charts</h2>
        {[1, 2, 3, 4, 5].map((option) => (
          <div key={option} className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {' '}
              Option {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
