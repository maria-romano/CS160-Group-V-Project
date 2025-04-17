import React, { useState } from 'react';
import './Dashboard.css';
import {
  ResponsiveContainer, LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';


function Dashboard() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [timeGranularity, setTimeGranularity] = useState('monthly');

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const renderChart = (option) => {
    if (option === 'totalDonations') {
      return <div className="stat-card">Total Donations: $100</div>;
    }
  
    if (option === 'totalDonors') {
      return <div className="stat-card">Total Donors: 10 Donors</div>;
    }
  
    if (option === 'averageDonation') {
      return <div className="stat-card">Average Donation Amount: $10</div>;
    }
  
    if (option === 'donationByTime') {
      let data = [];
      let xKey = '';
  
      switch (timeGranularity) {
        case 'weekly':
          data = [
            { week: 'Week 1', value: 100 },
            { week: 'Week 2', value: 150 },
            { week: 'Week 3', value: 200 },
          ];
          xKey = 'week';
          break;
        case 'monthly':
          data = [
            { month: 'Jan', value: 300 },
            { month: 'Feb', value: 400 },
            { month: 'Mar', value: 250 },
          ];
          xKey = 'month';
          break;
        case 'yearly':
          data = [
            { year: '2022', value: 1200 },
            { year: '2023', value: 1500 },
            { year: '2024', value: 1300 },
          ];
          xKey = 'year';
          break;
        default:
          break;
      }
  
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#00C49F" />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  
    if (option === 'donorTypeChart') {
      const data = [
        { type: 'New', amount: 60 },
        { type: 'Returning', amount: 40 },
      ];
  
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" stroke="#fff" />
            <YAxis dataKey="type" type="category" stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  
    if (option === 'donationsByDonorType') {
      const data = [
        { group: 'New Donors', donations: 800 },
        { group: 'Returning Donors', donations: 1200 },
      ];
  
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="donations" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  
    if (option === 'retentionRate') {
      return <div className="stat-card">30% Donor Retention Rate</div>;
    }
  
    if (option === 'donationPerCampaign') {
      const data = [
        { campaign: 'Campaign 1', value: 400 },
        { campaign: 'Campaign 2', value: 650 },
        { campaign: 'Campaign 3', value: 300 },
      ];
  
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campaign" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  
    if (option === 'goalProgress') {
      return (
        <div className="progress-container">
          <label>Fundraising Goal Progress</label>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '50%' }}></div>
          </div>
          <div className="progress-label">50%</div>
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <div className="dashboard-container">
      <button className="toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? 'Hide Customization' : 'Show Customization'}
      </button>

      <div className={`main-content ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
        <div className="chart-area">
          {selectedOptions.length === 0 ? (
            <p>Select options on the right to view charts.</p>
          ) : (
            <div className="chart-wrapper">
              {selectedOptions.map((option) => (
                <div key={option} className="chart-card">
                  {renderChart(option)}
                </div>
              ))}
            </div>
          )}
        </div>

        {showSidebar && (
          <div className="sidebar">
            <h2>Customize Charts</h2>

            {/* General Metrics */}
            <div className="metric-category">
              <h3>General Metrics</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('totalDonations')}
                    checked={selectedOptions.includes('totalDonations')}
                  />
                  Total Donations
                </label>
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('totalDonors')}
                    checked={selectedOptions.includes('totalDonors')}
                  />
                  Total Donors
                </label>
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('averageDonation')}
                    checked={selectedOptions.includes('averageDonation')}
                  />
                  Average Donation Amount
                </label>
              </div>
            </div>

            {/* Time-based Metrics */}
            <div className="metric-category">
              <h3>Time-based Metrics</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('donationByTime')}
                    checked={selectedOptions.includes('donationByTime')}
                  />
                  Total Donation by Time
                </label>
              </div>
              <div className="checkbox-group nested-group">
                <label>
                  <input
                    type="radio"
                    name="timeGranularity"
                    value="weekly"
                    checked={timeGranularity === 'weekly'}
                    onChange={() => setTimeGranularity('weekly')}
                  />
                  Weekly
                </label>
                <label>
                  <input
                    type="radio"
                    name="timeGranularity"
                    value="monthly"
                    checked={timeGranularity === 'monthly'}
                    onChange={() => setTimeGranularity('monthly')}
                  />
                  Monthly
                </label>
                <label>
                  <input
                    type="radio"
                    name="timeGranularity"
                    value="yearly"
                    checked={timeGranularity === 'yearly'}
                    onChange={() => setTimeGranularity('yearly')}
                  />
                  Yearly
                </label>
              </div>
            </div>

            {/* Donor Metrics */}
            <div className="metric-category">
              <h3>Donor Metrics</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('donorTypeChart')}
                    checked={selectedOptions.includes('donorTypeChart')}
                  />
                  Donor Type: New vs Returning
                </label>
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('donationsByDonorType')}
                    checked={selectedOptions.includes('donationsByDonorType')}
                  />
                  Total Donations by Donor Type
                </label>
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('retentionRate')}
                    checked={selectedOptions.includes('retentionRate')}
                  />
                  Donor Retention Rate
                </label>
              </div>
            </div>

            {/* Campaign Metrics */}
            <div className="metric-category">
              <h3>Campaign Metrics</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('donationPerCampaign')}
                    checked={selectedOptions.includes('donationPerCampaign')}
                  />
                  Total Donation per Campaign
                </label>
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('goalProgress')}
                    checked={selectedOptions.includes('goalProgress')}
                  />
                  Fundraising Goal Progress
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
