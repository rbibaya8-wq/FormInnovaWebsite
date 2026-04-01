import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SuperNavbar from "../components/SuperNavbar";
import "../style/ActivityLogs.css";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/activity-logs");
      setLogs(response.data);
      setError("");
    } catch (err) {
      console.error("Failed to load activity logs:", err);
      setError("Failed to load activity logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await api.get("/activity-logs");
      setLogs(response.data);
      setError("");
    } catch (err) {
      console.error("Refresh error:", err);
      setError("Failed to refresh activity logs.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }
  };

  const getActionClass = (action) => {
    switch (action) {
      case "approve_request":
      case "approved":
        return "sup-log-badge sup-log-badge-approve_request";
      case "reject_request":
      case "rejected":
        return "sup-log-badge sup-log-badge-reject_request";
      case "create_center":
      case "created":
        return "sup-log-badge sup-log-badge-create_center";
      case "add_payment":
      case "payment":
        return "sup-log-badge sup-log-badge-add_payment";
      case "disable_center":
      case "disabled":
        return "sup-log-badge sup-log-badge-disable_center";
      case "activate_center":
      case "activated":
        return "sup-log-badge sup-log-badge-activate_center";
      default:
        return "sup-log-badge sup-log-badge-default";
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const action = log.action?.toLowerCase() || "";
      const description = log.description?.toLowerCase() || "";
      const performedBy = log.performed_by?.toLowerCase() || "";
      const keyword = search.toLowerCase();

      return (
        action.includes(keyword) ||
        description.includes(keyword) ||
        performedBy.includes(keyword)
      );
    });
  }, [logs, search]);

  const totalLogs = logs.length;
  const approvals = logs.filter(
    (log) => log.action === "approve_request" || log.action === "approved"
  ).length;
  const rejections = logs.filter(
    (log) => log.action === "reject_request" || log.action === "rejected"
  ).length;
  const payments = logs.filter(
    (log) => log.action === "add_payment" || log.action === "payment"
  ).length;

  return (
    <div className="sup-page">
      <SuperNavbar
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onLogout={handleLogout}
      />

      <main className="sup-main">
        <div className="sup-topbar-row">
          <div className="sup-page-intro">
            <h1>Activity Logs</h1>
            <p>Track all important actions performed by the Super Admin.</p>
          </div>

          <div className="sup-filters">
            <input
              type="text"
              className="sup-input"
              placeholder="Search by action, description, or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {!loading && !error && (
          <div className="sup-cards sup-logs-stats sup-animate-up">
            <div className="sup-card">
              <span>Total Logs</span>
              <h3>{totalLogs}</h3>
            </div>
            <div className="sup-card">
              <span>Approvals</span>
              <h3>{approvals}</h3>
            </div>
            <div className="sup-card">
              <span>Rejections</span>
              <h3>{rejections}</h3>
            </div>
            <div className="sup-card">
              <span>Payments</span>
              <h3>{payments}</h3>
            </div>
          </div>
        )}

        {loading && (
          <div className="sup-state-box sup-animate-up">
            <p className="sup-empty-logs">Loading activity logs...</p>
          </div>
        )}

        {!loading && error && (
          <div className="sup-state-box sup-error-box sup-animate-up">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredLogs.length === 0 && (
          <div className="sup-state-box sup-animate-up">
            <p className="sup-empty-logs">No activity logs found.</p>
          </div>
        )}

        {!loading && !error && filteredLogs.length > 0 && (
          <div className="sup-grid-one sup-animate-up">
            <section className="sup-panel">
              <div className="sup-panel-head">
                <div>
                  <h3>Recent Activity</h3>
                  <p>Monitor all recent actions across the platform.</p>
                </div>
              </div>

              <div className="sup-logs-table-wrap">
                <table className="sup-logs-table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Description</th>
                      <th>Performed By</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="sup-log-action">
                          <span className={getActionClass(log.action)}>
                            {log.action}
                          </span>
                        </td>
                        <td className="sup-log-description">
                          {log.description}
                        </td>
                        <td className="sup-log-user">{log.performed_by}</td>
                        <td className="sup-log-date">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}