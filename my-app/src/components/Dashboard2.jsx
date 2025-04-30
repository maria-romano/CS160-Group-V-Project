import React, { useEffect, useState } from 'react';
import './Dashboard2.css';
import {
  ResponsiveContainer, LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const fallbackData = {
  organization_info: {
    foundation_name: "The Rockefeller Foundation",
    EIN: "13-1659629",
    tax_year: "2020",
    address: {
      street: "420 Fifth Avenue",
      city: "New York",
      state: "NY",
      ZIP: "10018-2702"
    },
    telephone: "(212) 852-8361"
  },
  financials: {
    total_revenue: 356063644,
    total_expenses: 285600759,
    net_investment_income: 72587310,
    disbursements_for_charitable_purposes: 268539317,
    contributions_gifts_grants_received: 11539,
    net_assets_or_fund_balances: {
      beginning_of_year: 4795538000,
      end_of_year: 6281040714
    },
    total_assets: {
      beginning_of_year: 4929907452,
      end_of_year: 7117904789
    },
    liabilities: {
      beginning_of_year: 134369452,
      end_of_year: 836864075
    }
  },
  expenses_breakdown: {
    compensation_of_officers_directors: 4119227,
    other_employee_salaries_and_wages: 33798097,
    pension_plans_employee_benefits: 10848559,
    legal_fees: 3005616,
    accounting_fees: 529420,
    other_professional_fees: 37310910,
    interest: 332901,
    taxes: 653416,
    depreciation: 2790352,
    occupancy: 3282507,
    travel_conferences_meetings: 2010511,
    printing_and_publications: 367586,
    other_expenses: 11322353,
    contributions_gifts_grants_paid: 175229304
  }
};

// export default function Dashboard2({ selectedOptions, setSelectedOptions, showSidebar, setShowSidebar, timeGranularity, setTimeGranularity }) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       // try {
//       //   const txtResponse = await fetch("/exp_2020.txt");
//       //   const txt = await txtResponse.text();

//       //   const reagentResponse = await fetch("https://your-reagent-api-endpoint.com/parse", {
//       //     method: "POST",
//       //     headers: { "Content-Type": "text/plain" },
//       //     body: txt
//       //   });

//       //   if (!reagentResponse.ok) throw new Error("Reagent call failed");

//       //   const jsonData = await reagentResponse.json();
//       //   setData(jsonData);
//       // } catch (err) {
//       //   console.error("Falling back to hardcoded JSON due to error:", err);
//       //   setData(fallbackData);
//       // }
//       setData(fallbackData);
//     }
//     fetchData();
//   }, []);

// // At the top, no change...
// // ...

export default function Dashboard2({ selectedOptions, setSelectedOptions, showSidebar, setShowSidebar }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(fallbackData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const { financials, expenses_breakdown: breakdown } = data;

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(opt => opt !== option)
        : [...prev, option]
    );
  };

  const smallMetrics = [
    { key: 'total_revenue', label: 'Total Revenue' },
    { key: 'total_expenses', label: 'Total Expenses' },
    { key: 'net_investment_income', label: 'Net Investment Income' },
    { key: 'disbursements_for_charitable_purposes', label: 'Charitable Disbursements' },
    { key: 'contributions_gifts_grants_received', label: 'Gifts/Grants Received' },
  ];

  const assetKeys = [
    { key: 'net_assets_or_fund_balances', label: 'Net Assets/Fund Balances' },
    { key: 'total_assets', label: 'Total Assets' },
    { key: 'liabilities', label: 'Liabilities' },
  ];

  const renderSmallMetric = (key, label) => (
    <div className="small-metric-card" key={key}>
      <div className="metric-value">${financials[key].toLocaleString()}</div>
      <div className="metric-label">{label}</div>
    </div>
  );

  const renderLineChart = (key, label) => (
    <div className="chart-card" key={key}>
      <h3>{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={[
            { name: 'Start', value: financials[key].beginning_of_year },
            { name: 'End', value: financials[key].end_of_year },
          ]}
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" width={80} />
          <Tooltip formatter={val => `$${val.toLocaleString()}`} />
          <Line type="monotone" dataKey="value" stroke="#00C49F" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  

  const renderExpensesBar = () => {
    const formatted = Object.entries(breakdown).map(([label, value]) => ({ label, value }));
    const total = formatted.reduce((sum, d) => sum + d.value, 0);
  
    return (
      <div className="chart-card">
        <h3>Total Expenses: ${total.toLocaleString()}</h3>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div style={{ width: `${formatted.length * 100}px` }}> {/* ~100px per bar */}
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={formatted}
                margin={{ top: 20, right: 30, left: 100, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  stroke="#fff"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={120}
                />
                <YAxis
                  stroke="#fff"
                  width={100}
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(val, name, props) => [`$${val.toLocaleString()}`, props.payload.label]}
                />
                <Bar dataKey="value" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };
  
  
  
  

  return (
    <div className="dashboard-container">
      <div className="dashboard-top-bar">
        <button className="toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? 'Hide Customization' : 'Show Customization'}
        </button>
      </div>
      <div className="dashboard-content-area">
        <div className="main-content">
          {/* Small Metrics Container */}
          <div className="small-metrics-container">
            {smallMetrics
              .filter(metric => selectedOptions.includes(metric.key))
              .map(metric => renderSmallMetric(metric.key, metric.label))}
          </div>
  
          {/* Chart Container */}
          <div className="chart-container">
            <div className="chart-wrapper">
              {assetKeys
                .filter(metric => selectedOptions.includes(metric.key))
                .map(metric => renderLineChart(metric.key, metric.label))}
            </div>
  
            {selectedOptions.includes('expenses_breakdown') && renderExpensesBar()}
          </div>
        </div>
  
        {showSidebar && (
          <div className="sidebar">
            <h2>Customize Charts</h2>
  
            <div className="metric-category">
              <h3>Small Metrics</h3>
              {smallMetrics.map(metric => (
                <div className="checkbox-group" key={metric.key}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(metric.key)}
                      checked={selectedOptions.includes(metric.key)}
                    />
                    {metric.label}
                  </label>
                </div>
              ))}
            </div>
  
            <div className="metric-category">
              <h3>Asset & Liability Charts</h3>
              {assetKeys.map(metric => (
                <div className="checkbox-group" key={metric.key}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(metric.key)}
                      checked={selectedOptions.includes(metric.key)}
                    />
                    {metric.label}
                  </label>
                </div>
              ))}
            </div>
  
            <div className="metric-category">
              <h3>Expenses</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('expenses_breakdown')}
                    checked={selectedOptions.includes('expenses_breakdown')}
                  />
                  Expense Breakdown Chart
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

