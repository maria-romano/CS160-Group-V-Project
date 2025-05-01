import React, { useState, useEffect } from "react";
import "./Dashboard2.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchAndParseReagentData } from "../utils/fetchReagentData";

const fallbackData = {
  organization_info: {
    foundation_name: "The Rockefeller Foundation",
    EIN: "13-1659629",
    tax_year: "2020",
    address: {
      street: "420 Fifth Avenue",
      city: "New York",
      state: "NY",
      ZIP: "10018-2702",
    },
    telephone: "(212) 852-8361",
  },
  financials: {
    total_revenue: 356063644,
    total_expenses: 285600759,
    net_investment_income: 72587310,
    disbursements_for_charitable_purposes: 268539317,
    contributions_gifts_grants_received: 11539,
    net_assets_or_fund_balances: {
      beginning_of_year: 4795538000,
      end_of_year: 6281040714,
    },
    total_assets: {
      beginning_of_year: 4929907452,
      end_of_year: 7117904789,
    },
    liabilities: {
      beginning_of_year: 134369452,
      end_of_year: 836864075,
    },
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
    contributions_gifts_grants_paid: 175229304,
  },
};

export default function Dashboard2({
  selectedOptions,
  setSelectedOptions,
  showSidebar,
  setShowSidebar,
  timeGranularity,
  setTimeGranularity,
  form990Data,
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [donationDropdownOpen, setDonationDropdownOpen] = useState(true);
  const [ngoDropdownOpen, setNGoDropdownOpen] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        setData(fallbackData);
      } catch (err) {
        console.error("Error loading data:", err);
        setData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [form990Data]);

  if (!data) return <div>Loading...</div>;

  const { financials, expenses_breakdown: breakdown } = data;

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const smallMetrics = [
    { key: "total_revenue", label: "Total Revenue" },
    { key: "total_expenses", label: "Total Expenses" },
    { key: "net_investment_income", label: "Net Investment Income" },
    {
      key: "disbursements_for_charitable_purposes",
      label: "Charitable Disbursements",
    },
    {
      key: "contributions_gifts_grants_received",
      label: "Gifts/Grants Received",
    },
  ];

  const assetKeys = [
    { key: "net_assets_or_fund_balances", label: "Net Assets/Fund Balances" },
    { key: "total_assets", label: "Total Assets" },
    { key: "liabilities", label: "Liabilities" },
  ];

  const donationMetrics = [
    { key: "totalDonations", label: "Total Donations" },
    { key: "totalDonors", label: "Total Donors" },
    { key: "averageDonation", label: "Average Donation" },
    { key: "donorTypeChart", label: "Donor Type Chart" },
    { key: "donationByTime", label: "Donations Over Time" },
    { key: "donationsByDonorType", label: "Donations by Donor Type" },
    { key: "retentionRate", label: "Donor Retention Rate" },
    { key: "donationPerCampaign", label: "Donations per Campaign" },
    { key: "goalProgress", label: "Goal Progress" },
  ];

  const renderSmallMetric = (key, label) => (
    <div className="small-metric-card" key={key}>
      <div className="metric-value">
        ${financials[key] ? financials[key].toLocaleString() : "-"}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );

  const renderLineChart = (key, label) => (
    <div className="chart-card" key={key}>
      <h3>{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={[
            { name: "Start", value: financials[key]?.beginning_of_year || 0 },
            { name: "End", value: financials[key]?.end_of_year || 0 },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
          <Line type="monotone" dataKey="value" stroke="#00C49F" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderExpensesBar = () => {
    const formatted = Object.entries(breakdown).map(([label, value]) => ({
      label,
      value,
    }));
    const total = formatted.reduce((sum, d) => sum + d.value, 0);

    return (
      <div className="chart-card">
        <h3>Total Expenses: ${total.toLocaleString()}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#fff" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#fff" />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`]} />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderChart = (option) => {
    if (option === "totalDonations") {
      return (
        <div className="small-metric-card">
          <div className="metric-value">$100</div>
          <div className="metric-label">Total Donations</div>
        </div>
      );
    }

    if (option === "totalDonors") {
      return (
        <div className="small-metric-card">
          <div className="metric-value">10</div>
          <div className="metric-label">Total Donors</div>
        </div>
      );
    }

    if (option === "averageDonation") {
      return (
        <div className="small-metric-card">
          <div className="metric-value">$10</div>
          <div className="metric-label">Average Donation</div>
        </div>
      );
    }

    if (option === "donationByTime") {
      let data = [];
      let xKey = "";

      switch (timeGranularity) {
        case "weekly":
          data = [
            { week: "Week 1", value: 100 },
            { week: "Week 2", value: 150 },
            { week: "Week 3", value: 200 },
          ];
          xKey = "week";
          break;
        case "monthly":
          data = [
            { month: "Jan", value: 300 },
            { month: "Feb", value: 400 },
            { month: "Mar", value: 250 },
          ];
          xKey = "month";
          break;
        case "yearly":
          data = [
            { year: "2022", value: 1200 },
            { year: "2023", value: 1500 },
            { year: "2024", value: 1300 },
          ];
          xKey = "year";
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

    if (option === "donorTypeChart") {
      const data = [
        { type: "New", amount: 60 },
        { type: "Returning", amount: 40 },
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

    if (option === "donationsByDonorType") {
      const data = [
        { group: "New Donors", donations: 800 },
        { group: "Returning Donors", donations: 1200 },
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

    if (option === "retentionRate") {
      return (
        <div className="small-metric-card">
          <div className="metric-value">30%</div>
          <div className="metric-label">Donor Retention Rate</div>
        </div>
      );
    }

    if (option === "donationPerCampaign") {
      const data = [
        { campaign: "Campaign 1", value: 400 },
        { campaign: "Campaign 2", value: 650 },
        { campaign: "Campaign 3", value: 300 },
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

    if (option === "goalProgress") {
      return (
        <div className="progress-container">
          <label>Fundraising Goal Progress</label>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
          <div className="progress-label">50%</div>
        </div>
      );
    }

    return null;
  };


  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-top-bar">
          <button className="toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? "Hide Customization" : "Show Customization"}
          </button>
        </div>

        <div className="dashboard-content-area">
          <div className="main-content">
            <div className="small-metrics-container">
              {[...smallMetrics, ...donationMetrics.slice(0, 4)]
                .filter((m) => selectedOptions.includes(m.key))
                .map((m) => renderSmallMetric(m.key, m.label))}
            </div>

            <div className="chart-wrapper">
              {assetKeys
                .filter((m) => selectedOptions.includes(m.key))
                .map((m) => renderLineChart(m.key, m.label))}
              {selectedOptions.includes("expenses_breakdown") && renderExpensesBar()}
            </div>

            <div className="chart-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedOptions
                .filter((option) =>
                  donationMetrics.map((m) => m.key).includes(option) &&
                  !["totalDonations", "totalDonors", "averageDonation", "donorTypeChart"].includes(option)
                )
                .map((option) => (
                  <div key={option} className="chart-card">
                    {renderChart(option)}
                  </div>
                ))}
            </div>
          </div>

          {showSidebar && (
            <div className="sidebar">
              <h2>Customize Charts</h2>
              <div className="dropdown-section">
                <h3 onClick={() => setDonationDropdownOpen(!donationDropdownOpen)}>
                  Donation Insights {donationDropdownOpen ? "▲" : "▼"}
                </h3>
                {donationDropdownOpen && (
                  <>
                    {donationMetrics.map((metric) => (
                      <div className="checkbox-group" key={metric.key}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(metric.key)}
                            onChange={() => handleCheckboxChange(metric.key)}
                          />
                          {metric.label}
                        </label>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="dropdown-section">
                <h3 onClick={() => setNGoDropdownOpen(!ngoDropdownOpen)}>
                  NGO Insights {ngoDropdownOpen ? "▲" : "▼"}
                </h3>
                {ngoDropdownOpen && (
                  <>
                    {smallMetrics.map((metric) => (
                      <div className="checkbox-group" key={metric.key}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(metric.key)}
                            onChange={() => handleCheckboxChange(metric.key)}
                          />
                          {metric.label}
                        </label>
                      </div>
                    ))}

                    {assetKeys.map((metric) => (
                      <div className="checkbox-group" key={metric.key}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(metric.key)}
                            onChange={() => handleCheckboxChange(metric.key)}
                          />
                          {metric.label}
                        </label>
                      </div>
                    ))}

                    <div className="checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes("expenses_breakdown")}
                          onChange={() => handleCheckboxChange("expenses_breakdown")}
                        />
                        Expense Breakdown
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}