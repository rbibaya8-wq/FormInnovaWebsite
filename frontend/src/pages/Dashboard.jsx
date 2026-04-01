import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../services/api";
import { logout } from "../services/authService";
import SuperNavbar from "../components/SuperNavbar";
import "../style/Dashboard.css";

const INITIAL_DASHBOARD = {
  summary: {
    total_centers: 0,
    active_centers: 0,
    disabled_centers: 0,
    pending_requests: 0,
    accepted_requests: 0,
    rejected_requests: 0,
    monthly_revenue: 0,
    payments_count: 0,
  },
  monthly_revenue_chart: [],
  request_status_chart: [],
  latest_requests: [],
  latest_payments: [],
  recent_activities: [],
};

const MONTHS = [
  { value: "", label: "All Months" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const STATUS_COLORS = {
  pending: { bg: "#fff4db", text: "#9a6700" },
  accepted: { bg: "#e7f8ec", text: "#166534" },
  rejected: { bg: "#fdecec", text: "#b42318" },
};

const PIE_COLORS = ["#f59e0b", "#22c55e", "#ef4444"];

function Dashboard() {
  const [dashboard, setDashboard] = useState(INITIAL_DASHBOARD);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const years = useMemo(() => {
    const list = [];
    for (let year = currentYear - 2; year <= currentYear + 2; year++) {
      list.push(year);
    }
    return list;
  }, [currentYear]);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  }, []);

  const fetchDashboard = useCallback(
    async (manualRefresh = false) => {
      try {
        setError("");
        if (manualRefresh) {
          setRefreshing(true);
        }

        const response = await api.get("/dashboard", {
          params: {
            year: selectedYear,
            month: selectedMonth === "" ? "" : selectedMonth,
          },
        });

        setDashboard(response.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedYear, selectedMonth]
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleRefresh = () => {
    fetchDashboard(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.reload();
    }
  };

  const summaryCards = [
    {
      title: "Total Centers",
      value: dashboard.summary.total_centers,
    },
    {
      title: "Active Centers",
      value: dashboard.summary.active_centers,
    },
    {
      title: "Disabled Centers",
      value: dashboard.summary.disabled_centers,
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(dashboard.summary.monthly_revenue),
    },
    {
      title: "Payments Count",
      value: dashboard.summary.payments_count,
    },
  ];

  if (loading) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box sup-error-box">
          <h2>Dashboard Error</h2>
          <p>{error}</p>
          <button className="sup-btn sup-btn-light" onClick={() => fetchDashboard()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sup-page">
      <SuperNavbar
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onLogout={handleLogout}
      />

      <main className="sup-main">
        <section className="sup-topbar-row">
          <div className="sup-page-intro">
            <h1>Dashboard</h1>
            <p>Overview of centers, requests, payments and recent platform activity.</p>
          </div>

          <div className="sup-filters">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="sup-select"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="sup-select"
            >
              {MONTHS.map((month) => (
                <option key={month.label} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="sup-cards">
          {summaryCards.map((card, index) => (
            <div
              className="sup-card sup-animate-up"
              key={card.title}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span>{card.title}</span>
              <h3>{card.value}</h3>
            </div>
          ))}
        </section>

        <section className="sup-grid-two sup-graphs-grid">
          <div className="sup-panel sup-chart-panel sup-animate-up">
            <div className="sup-panel-head">
              <div>
                <h3>Monthly Revenue</h3>
                <p>Revenue overview by month</p>
              </div>
            </div>

            <div className="sup-chart">
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={dashboard.monthly_revenue_chart}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="amount" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="sup-panel sup-pie-panel sup-animate-up delay-1">
            <div className="sup-panel-head">
              <div>
                <h3>Requests Status</h3>
                <p>Accepted, pending and rejected requests</p>
              </div>
            </div>

            <div className="sup-pie-wrap">
              <div className="sup-pie-chart-box">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={dashboard.request_status_chart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={88}
                      paddingAngle={4}
                    >
                      {dashboard.request_status_chart.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="sup-status-legend">
                {dashboard.request_status_chart.map((item, index) => (
                  <div className="sup-status-legend-item" key={item.name}>
                    <div className="sup-status-left">
                      <span
                        className="sup-status-dot"
                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sup-grid-two">
          <div className="sup-panel sup-animate-up">
            <div className="sup-panel-head">
              <h3>Latest Requests</h3>
              <p>Newest center registration requests</p>
            </div>

            <div className="sup-list">
              {dashboard.latest_requests.length > 0 ? (
                dashboard.latest_requests.map((item) => (
                  <div key={item.id} className="sup-row">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.city}</p>
                    </div>

                    <StatusBadge status={item.status} />
                  </div>
                ))
              ) : (
                <p className="sup-empty">No recent requests.</p>
              )}
            </div>
          </div>

          <div className="sup-panel sup-animate-up delay-1">
            <div className="sup-panel-head">
              <h3>Latest Payments</h3>
              <p>Newest payments received from centers</p>
            </div>

            <div className="sup-list">
              {dashboard.latest_payments.length > 0 ? (
                dashboard.latest_payments.map((item) => (
                  <div key={item.id} className="sup-row">
                    <div>
                      <strong>{item.center?.name || "-"}</strong>
                      <p>
                        {item.month}/{item.year}
                      </p>
                    </div>

                    <span className="sup-price">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="sup-empty">No recent payments.</p>
              )}
            </div>
          </div>
        </section>

        <section className="sup-grid-one">
          <div className="sup-panel sup-animate-up">
            <div className="sup-panel-head">
              <h3>Recent Activities</h3>
              <p>Latest actions in the platform</p>
            </div>

            <div className="sup-list">
              {dashboard.recent_activities.length > 0 ? (
                dashboard.recent_activities.map((activity) => (
                  <div key={activity.id} className="sup-list-item">
                    <div className="sup-activity-top">
                      <strong>{activity.action}</strong>
                      <span>{formatDateTime(activity.created_at)}</span>
                    </div>
                    <p>{activity.description}</p>
                  </div>
                ))
              ) : (
                <p className="sup-empty">No recent activities.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = STATUS_COLORS[status] || {
    bg: "#f1f5f9",
    text: "#475569",
  };

  return (
    <span
      className="sup-status-badge"
      style={{
        backgroundColor: config.bg,
        color: config.text,
      }}
    >
      {status}
    </span>
  );
}

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

export default Dashboard;