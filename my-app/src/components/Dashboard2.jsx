import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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

export default function Dashboard2({ selectedOptions, setSelectedOptions, showSidebar, setShowSidebar, timeGranularity, setTimeGranularity }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // try {
      //   // const txtResponse = await fetch("/exp_2020.txt");
      //   // const txt = await txtResponse.text();
      //   // const reagentResponse = await fetch("https://your-reagent-api-endpoint.com/parse", {
      //   //   method: "POST",
      //   //   headers: { "Content-Type": "text/plain" },
      //   //   body: txt
      //   // });
      //   // if (!reagentResponse.ok) throw new Error("Reagent call failed");
      //   // const jsonData = await reagentResponse.json();
      //   // setData(jsonData);

      //   setData(fallbackData);
      // } catch (err) {
      //   console.error("Failed to fetch data, using fallback.", err);
      //   setData(fallbackData);
      // }
      setData(fallbackData);
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const renderChart = (option) => {
    if (!data) return null;
    const f = data.financials;

    const metricCard = (label, value) => (
      <div className="small-metric-card">
        <div className="metric-value">${value.toLocaleString()}</div>
        <div className="metric-label">{label}</div>
      </div>
    );

    switch (option) {
      case 'totalRevenue':
        return metricCard("Total Revenue", f.total_revenue);
      case 'totalExpenses':
        return metricCard("Total Expenses", f.total_expenses);
      case 'netInvestmentIncome':
        return metricCard("Net Investment Income", f.net_investment_income);
      case 'disbursements':
        return metricCard("Charitable Disbursements", f.disbursements_for_charitable_purposes);
      case 'contributionsReceived':
        return metricCard("Contributions Received", f.contributions_gifts_grants_received);
      case 'netAssetsChart':
        const netAssetsData = [
          { name: 'Beginning', netAssets: f.net_assets_or_fund_balances.beginning_of_year, totalAssets: f.total_assets.beginning_of_year, liabilities: f.liabilities.beginning_of_year },
          { name: 'End', netAssets: f.net_assets_or_fund_balances.end_of_year, totalAssets: f.total_assets.end_of_year, liabilities: f.liabilities.end_of_year }
        ];
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={netAssetsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="netAssets" fill="#00C49F" />
              <Bar dataKey="totalAssets" fill="#8884d8" />
              <Bar dataKey="liabilities" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <button className="toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? 'Hide Customization' : 'Show Customization'}
      </button>

      <div className={`main-content ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
        <div className="flex flex-wrap gap-4 mb-6">
          {selectedOptions
            .filter(option => [
              'totalRevenue', 'totalExpenses', 'netInvestmentIncome', 'disbursements', 'contributionsReceived'
            ].includes(option))
            .map(option => (
              <div key={option} className="w-[200px]">
                {renderChart(option)}
              </div>
            ))}
        </div>

        <div className="chart-area">
          {selectedOptions.length === 0 ? (
            <p>Select options on the right to view metrics and charts.</p>
          ) : (
            <div className="chart-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedOptions
                .filter(option => ![
                  'totalRevenue', 'totalExpenses', 'netInvestmentIncome', 'disbursements', 'contributionsReceived'
                ].includes(option))
                .map(option => (
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
            <div className="metric-category">
              <h3>Financial Metrics</h3>
              {[
                { key: 'totalRevenue', label: 'Total Revenue' },
                { key: 'totalExpenses', label: 'Total Expenses' },
                { key: 'netInvestmentIncome', label: 'Net Investment Income' },
                { key: 'disbursements', label: 'Charitable Disbursements' },
                { key: 'contributionsReceived', label: 'Contributions Received' },
              ].map(({ key, label }) => (
                <div className="checkbox-group" key={key}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(key)}
                      checked={selectedOptions.includes(key)}
                    />
                    {label}
                  </label>
                </div>
              ))}
            </div>
            <div className="metric-category">
              <h3>Charts</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('netAssetsChart')}
                    checked={selectedOptions.includes('netAssetsChart')}
                  />
                  Net Assets / Liabilities
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


