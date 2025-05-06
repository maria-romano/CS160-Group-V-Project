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
  organization_info : {
    foundation_name: "SEACOLOGY",
    EIN: "87-0495235",
    tax_year: "2022",
    address: {
      street: "1623 SOLANO AVENUE",
      city: "BERKELEY",
      state: "CA",
      ZIP: "94707"
    },
    telephone: "(510) 559-3505",
    website: "WWW.SEACOLOGY.ORG",
    principal_officer: {
      name: "DUANE SILVERSTEIN",
      address: "1623 SOLANO AVENUE, BERKELEY, CA 94707"
    },
    year_of_formation: 1991,
    state_of_legal_domicile: "CA"
  },
  financials: {
    total_revenue: 3256392,
    total_expenses: 2820441,
    net_investment_income: 296036,
    disbursements_for_charitable_purposes: 982256, 
    total_assets: {
      beginning_of_year: 10971501,
      end_of_year: 10148588
    },
    liabilities: {
      beginning_of_year: 143166,
      end_of_year: 427195
    },
    net_assets_or_fund_balances: {
      beginning_of_year: 10828335,
      end_of_year: 9721933
    }
  },
  expenses_breakdown: {
    contributions_gifts_grants_paid: 982256,
    salaries: 1181958,
    professional_fundraising_fees: 0,
    other_expenses: 656227,
    total_functional_expenses: 3824427
  }
};

// Add this function to normalize data format
const normalizeData = (inputData) => {
  // Check if this is the Reagent API format or our fallback format
  if (!inputData) return fallbackData;

  // If it already has the expected structure, return as is
  if (
    inputData.organization_info &&
    inputData.financials &&
    inputData.expenses_breakdown
  ) {
    console.log("Data already in expected format");
    return inputData;
  }

  // Otherwise, try to map the Reagent API response to our expected format
  console.log("Normalizing data format from Reagent API");
  try {
    // This is a simplified example - adjust based on actual Reagent API response
    return {
      organization_info: {
        foundation_name: inputData.organization?.name || "Unknown Foundation",
        EIN: inputData.organization?.ein || "XX-XXXXXXX",
        tax_year: inputData.organization?.taxYear || "2023",
        address: {
          street: inputData.organization?.address?.street || "Unknown Street",
          city: inputData.organization?.address?.city || "Unknown City",
          state: inputData.organization?.address?.state || "XX",
          ZIP: inputData.organization?.address?.zip || "00000",
        },
        telephone: inputData.organization?.telephone || "000-000-0000",
      },
      financials: {
        total_revenue: inputData.financials?.totalRevenue || 0,
        total_expenses: inputData.financials?.totalExpenses || 0,
        net_investment_income: inputData.financials?.investments || 0,
        disbursements_for_charitable_purposes:
          inputData.financials?.programServiceExpenses || 0,
        contributions_gifts_grants_received: inputData.financials?.grants || 0,
        net_assets_or_fund_balances: {
          beginning_of_year: inputData.financials?.netAssets || 0,
          end_of_year: (inputData.financials?.netAssets || 0) * 1.1, // Estimate
        },
        total_assets: {
          beginning_of_year: inputData.financials?.totalAssets || 0,
          end_of_year: (inputData.financials?.totalAssets || 0) * 1.05, // Estimate
        },
        liabilities: {
          beginning_of_year: inputData.financials?.liabilities || 0,
          end_of_year: (inputData.financials?.liabilities || 0) * 1.02, // Estimate
        },
      },
      expenses_breakdown: {
        compensation_of_officers_directors:
          inputData.financials?.managementExpenses || 0,
        other_employee_salaries_and_wages:
          inputData.financials?.managementExpenses * 0.5 || 0,
        pension_plans_employee_benefits:
          inputData.financials?.managementExpenses * 0.2 || 0,
        legal_fees: inputData.financials?.managementExpenses * 0.1 || 0,
        accounting_fees: inputData.financials?.managementExpenses * 0.05 || 0,
        other_professional_fees:
          inputData.financials?.managementExpenses * 0.15 || 0,
        interest: 0,
        taxes: 0,
        depreciation: 0,
        occupancy: 0,
        travel_conferences_meetings: 0,
        printing_and_publications: 0,
        other_expenses: 0,
        contributions_gifts_grants_paid: inputData.financials?.grants || 0,
      },
    };
  } catch (err) {
    console.error("Error normalizing data:", err);
    return fallbackData;
  }
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
        // First check if we have data from form990Data prop
        if (form990Data) {
          console.log("Using form990Data from props:", form990Data);
          setData(normalizeData(form990Data));
        } else {
          // Then check localStorage
          const storedData = localStorage.getItem("form990StructuredData");
          if (storedData) {
            console.log("Using data from localStorage");
            setData(normalizeData(JSON.parse(storedData)));
          } else {
            // Fall back to default data
            console.log("Using fallback data");
            setData(fallbackData);
          }
        }
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

  const handleCheckboxChange = (value) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const smallMetrics = [
    { key: "totalDonations", label: "Total Donations" },
    { key: "totalDonors", label: "Total Donors" },
    { key: "averageDonation", label: "Average Donation" },
    { key: "retentionRate", label: "Donor Retention Rate" },
    { key: "goalProgress", label: "Goal Progress" },
    { key: "total_revenue", label: "Total Revenue" },
    { key: "total_expenses", label: "Total Expenses" },
    { key: "net_investment_income", label: "Net Investment Income" },
    {
      key: "contributions_gifts_grants_received",
      label: "Gifts/Grants Received",
    },
  ];

  const assetKeys = [
    { key: "net_assets_or_fund_balances", label: "Net Assets/Fund Balances" },
    { key: "total_assets", label: "Total Assets" },
    { key: "liabilities", label: "Liabilities" },
    { key: "donorTypeChart", label: "Donor Type Chart" },
    { key: "donationByTime", label: "Donations Over Time" },
    { key: "donationsByDonorType", label: "Donations by Donor Type" },
    { key: "donationPerCampaign", label: "Donations per Campaign" },
  ];

  const donationInsightsMetrics = [
    { key: "totalDonations", label: "Total Donations" },
    { key: "totalDonors", label: "Total Donors" },
    { key: "averageDonation", label: "Average Donation" },
    { key: "retentionRate", label: "Donor Retention Rate" },
    { key: "goalProgress", label: "Goal Progress" },
    { key: "donorTypeChart", label: "Donor Type Chart" },
    { key: "donationByTime", label: "Donations Over Time" },
    { key: "donationsByDonorType", label: "Donations by Donor Type" },
    { key: "donationPerCampaign", label: "Donations per Campaign" },
  ];

  const ngoInsightsMetrics = [
    ...smallMetrics,
    ...assetKeys,
    { key: "expenses_breakdown", label: "Expense Breakdown" },
  ].filter((m) => !donationInsightsMetrics.find((d) => d.key === m.key));

  const renderSmallMetric = (key, label) => {
    if (key === "totalDonations") {
      return (
        <div className="small-metric-card" key={key}>
          <div className="metric-value">$500,000</div>
          <div className="metric-label">Total Donations</div>
        </div>
      );
    }

    if (key === "totalDonors") {
      return (
        <div className="small-metric-card" key={key}>
          <div className="metric-value">48</div>
          <div className="metric-label">Total Donors</div>
        </div>
      );
    }

    if (key === "averageDonation") {
      return (
        <div className="small-metric-card" key={key}>
          <div className="metric-value">$10,410</div>
          <div className="metric-label">Average Donation</div>
        </div>
      );
    }

    if (key === "goalProgress") {
      return (
        <div className="small-metric-card" key={key}>
          <label>{label}</label>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
          <div className="progress-label">50%</div>
        </div>
      );
    }

    if (key === "retentionRate") {
      return (
        <div className="small-metric-card" key={key}>
          <div className="metric-value">30%</div>
          <div className="metric-label">{label}</div>
        </div>
      );
    }

    return (
      <div className="small-metric-card" key={key}>
        <div className="metric-value">
          ${financials[key] ? financials[key].toLocaleString() : "-"}
        </div>
        <div className="metric-label">{label}</div>
      </div>
    );
  };

  const renderLineChart = (key, label) => (
    <div className="chart-card" key={key}>
      <h3>{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={[
            { name: "Start", value: financials[key]?.beginning_of_year || 0 },
            { name: "End", value: financials[key]?.end_of_year || 0 },
          ]}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }} // ← extra left margin
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" width={100} /> {/* ← wider Y-axis */}
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
          <BarChart 
          data={formatted}
          margin={{ top: 10, right: 30, left: 100, bottom: 120 }} // ← ample bottom for angled X labels
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              stroke="#fff"
              angle={-45}
              textAnchor="end"
              height={100}
              tickFormatter={(label) =>
                label
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              }
            />
            <YAxis stroke="#fff" width={100} /> {/* ← fix Y-axis clipping */}
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`]} />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const formatLabel = (label) =>
    label
      .split(/_|(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const renderChart = (option) => {
    if (option === "donationByTime") {
      let data = [];
      let xKey = "";

      switch (timeGranularity) {
        case "weekly":
          data = [
            { week: "Week 1", value: 200000 },
            { week: "Week 2", value: 210000 },
            { week: "Week 3", value: 220000 },
          ];
          xKey = "week";
          break;
        case "monthly":
          data = [
            { month: "Jan", value: 200000 },
            { month: "Feb", value: 250000 },
            { month: "Mar", value: 300000 },
          ];
          xKey = "month";
          break;
        case "yearly":
          data = [
            { year: "2022", value: 100000 },
            { year: "2023", value: 150000 },
            { year: "2024", value: 500000 },
          ];
          xKey = "year";
          break;
        default:
          break;
      }

      return (
        <div>
          <div className="time-toggle">
            {["weekly", "monthly", "yearly"].map((granularity) => (
              <button
                key={granularity}
                onClick={() => setTimeGranularity(granularity)}
                className={`time-button ${
                  timeGranularity === granularity ? "active" : ""
                }`}
              >
                {granularity.charAt(0).toUpperCase() + granularity.slice(1)}
              </button>
            ))}
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} stroke="#fff" />
                <YAxis stroke="#fff" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value, name) => [`$${value.toLocaleString?.() ?? value}`, formatLabel(name)]}
                />
                <Legend
                  formatter={(value) => formatLabel(value)}
                />
                <Line type="monotone" dataKey="value" stroke="#00C49F" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }

    if (option === "donorTypeChart") {
      const data = [
        { type: "New", amount: 20 },
        { type: "Returning", amount: 28 },
      ];

      return (
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical"
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }} // ← ADDED LEFT MARGIN
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" stroke="#fff" />
              <YAxis dataKey="type" type="category" stroke="#fff" width={120} /> {/* ← FIXED WIDTH */}
              <Tooltip
              formatter={(value, name) => [`$${value.toLocaleString?.() ?? value}`, formatLabel(name)]}
            />
            <Legend
              formatter={(value) => formatLabel(value)}
            />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (option === "donationsByDonorType") {
      const data = [
        { group: "New Donors", donations: 20 },
        { group: "Returning Donors", donations: 28 },
      ];

      return (
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" stroke="#fff" />
              <YAxis stroke="#fff" tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip
                formatter={(value, name) => [`$${value.toLocaleString?.() ?? value}`, formatLabel(name)]}
              />
              <Legend
                formatter={(value) => formatLabel(value)}
              />
              <Bar dataKey="donations" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
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
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={300}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }} // ← ADDED LEFT MARGIN
          >
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campaign" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                formatter={(value, name) => [`$${value.toLocaleString?.() ?? value}`, formatLabel(name)]}
              />
              <Legend
                formatter={(value) => formatLabel(value)}
              />
              <Bar dataKey="value" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  };

  const handleBulkSelect = (keys) => {
    setSelectedOptions((prev) => {
      const newSelection = [...prev];
      keys.forEach((key) => {
        const index = newSelection.indexOf(key);
        if (index !== -1) newSelection.splice(index, 1); // remove old position
        newSelection.push(key); // add to end (top of display)
      });
      return [...new Set(newSelection)];
    });
  };

  const handleBulkDeselect = (keys) => {
    setSelectedOptions((prev) => prev.filter((key) => !keys.includes(key)));
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-top-bar">
          <button
            className="toggle-sidebar"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Customization" : "Show Customization"}
          </button>
        </div>

        <div className="dashboard-content-area">
          <div className="main-content">
            <div className="small-metrics-container">
              {selectedOptions
                .filter((key) => smallMetrics.some((m) => m.key === key))
                .map((key) => {
                  const metric = smallMetrics.find((m) => m.key === key);
                  return renderSmallMetric(metric.key, metric.label);
                })}
            </div>

            <div className="large-metrics-container">
              {selectedOptions
                .filter((key) => !smallMetrics.some((m) => m.key === key))
                .map((key) => {
                  const metric = [
                    ...donationInsightsMetrics,
                    ...ngoInsightsMetrics,
                  ].find((m) => m.key === key);

                  if (!metric) return null;

                  if (
                    [
                      "donationByTime",
                      "donorTypeChart",
                      "donationsByDonorType",
                      "donationPerCampaign",
                    ].includes(key)
                  ) {
                    return renderChart(metric.key, metric.label);
                  } else if (key === "expenses_breakdown") {
                    return renderExpensesBar();
                  } else {
                    return renderLineChart(metric.key, metric.label);
                  }
                })}
            </div>
          </div>

          {showSidebar && (
            <div className="sidebar">
              <h2>Customize Charts</h2>

              <div className="dropdown-section">
              <h3 onClick={() => setDonationDropdownOpen(!donationDropdownOpen)}>
                  <span className="tooltip-wrapper">
                    <span className="info-icon">?</span>
                    <span className="tooltip-text">Insights from real time donations done through DonorLoop</span>
                  </span>
                  Donation Insights {donationDropdownOpen ? "▲" : "▼"}
              </h3>

                {donationDropdownOpen && (
                  <>
                    <div className="checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={donationInsightsMetrics.every((m) =>
                            selectedOptions.includes(m.key)
                          )}
                          onChange={(e) => {
                            const allKeys = donationInsightsMetrics.map(
                              (m) => m.key
                            );
                            if (e.target.checked) {
                              handleBulkSelect(allKeys); // adds in order
                            } else {
                              handleBulkDeselect(allKeys);
                            }
                          }}
                        />
                        Select All
                      </label>
                    </div>

                    {donationInsightsMetrics.map((metric) => (
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
              <h3 onClick={() => {
                const newVal = !ngoDropdownOpen;
                setNGoDropdownOpen(newVal);
                localStorage.setItem("ngoDropdownOpen", JSON.stringify(newVal));
              }}>
                <span className="tooltip-wrapper">
                  <span className="info-icon">?</span>
                  <span className="tooltip-text">Your information taken from IRS 990 forms</span>
                </span>
                NGO Insights {ngoDropdownOpen ? "▲" : "▼"}
              </h3>
              
                {ngoDropdownOpen && (
                  <>
                    <div className="checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={ngoInsightsMetrics.every((m) =>
                            selectedOptions.includes(m.key)
                          )}
                          onChange={(e) => {
                            const allKeys = ngoInsightsMetrics.map(
                              (m) => m.key
                            );
                            if (e.target.checked) {
                              handleBulkSelect(allKeys); // adds in order
                            } else {
                              handleBulkDeselect(allKeys);
                            }
                          }}
                        />
                        Select All
                      </label>
                    </div>

                    {ngoInsightsMetrics.map((metric) => (
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}