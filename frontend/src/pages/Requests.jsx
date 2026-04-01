import { useCallback, useEffect, useMemo, useState } from "react";
import SuperNavbar from "../components/SuperNavbar";
import api from "../services/api";
import { logout } from "../services/authService";
import "../style/Requests.css";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState({});

  const fetchRequests = useCallback(async (manualRefresh = false) => {
    try {
      setError("");
      if (manualRefresh) {
        setRefreshing(true);
      }

      const response = await api.get("/center-requests");
      setRequests(response.data || []);
    } catch (err) {
      console.error("Requests fetch error:", err);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRefresh = () => {
    fetchRequests(true);
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

  const setRowLoading = (id, value) => {
    setActionLoading((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleApprove = async (id) => {
    try {
      setRowLoading(id, true);
      const response = await api.post(`/center-requests/${id}/approve`);

      const generatedPassword = response?.data?.generated_password;
      if (generatedPassword) {
        alert(`Request approved.\nGenerated password: ${generatedPassword}`);
      }

      await fetchRequests();
    } catch (err) {
      console.error("Approve request error:", err);
      alert(err?.response?.data?.message || "Failed to approve request.");
    } finally {
      setRowLoading(id, false);
    }
  };

  const handleReject = async (id) => {
    try {
      setRowLoading(id, true);
      await api.post(`/center-requests/${id}/reject`);
      await fetchRequests();
    } catch (err) {
      console.error("Reject request error:", err);
      alert(err?.response?.data?.message || "Failed to reject request.");
    } finally {
      setRowLoading(id, false);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.name?.toLowerCase().includes(search.toLowerCase()) ||
        request.email?.toLowerCase().includes(search.toLowerCase()) ||
        request.city?.toLowerCase().includes(search.toLowerCase()) ||
        request.phone?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const accepted = requests.filter((r) => r.status === "accepted").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;

    return { total, pending, accepted, rejected };
  }, [requests]);

  if (loading) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box">Loading requests...</div>
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
          <h2>Requests Error</h2>
          <p>{error}</p>
          <button className="sup-btn sup-btn-light" onClick={() => fetchRequests()}>
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
            <h1>Requests</h1>
            <p>Review and manage center registration requests.</p>
          </div>

          <div className="sup-filters">
            <input
              type="text"
              placeholder="Search by name, email, city or phone"
              className="sup-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="sup-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </section>

        <section className="sup-cards sup-requests-stats">
          <div className="sup-card sup-animate-up">
            <span>Total Requests</span>
            <h3>{stats.total}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.06s" }}>
            <span>Pending Requests</span>
            <h3>{stats.pending}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.12s" }}>
            <span>Accepted Requests</span>
            <h3>{stats.accepted}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.18s" }}>
            <span>Rejected Requests</span>
            <h3>{stats.rejected}</h3>
          </div>
        </section>

        <section className="sup-panel sup-animate-up">
          <div className="sup-panel-head">
            <div>
              <h3>Requests List</h3>
              <p>{filteredRequests.length} result(s)</p>
            </div>
          </div>

          {filteredRequests.length > 0 ? (
            <div className="sup-table-wrap">
              <table className="sup-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="sup-actions-col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.name}</td>
                      <td>{request.email}</td>
                      <td>{request.phone || "-"}</td>
                      <td>{request.city}</td>
                      <td className="sup-message-cell">{request.message || "-"}</td>
                      <td>
                        <StatusBadge status={request.status} />
                      </td>
                      <td>{formatDate(request.created_at)}</td>
                      <td>
                        <div className="sup-table-actions">
                          {request.status === "pending" ? (
                            <>
                              <button
                                className="sup-btn sup-btn-success"
                                onClick={() => handleApprove(request.id)}
                                disabled={!!actionLoading[request.id]}
                              >
                                {actionLoading[request.id] ? "Processing..." : "Approve"}
                              </button>

                              <button
                                className="sup-btn sup-btn-danger"
                                onClick={() => handleReject(request.id)}
                                disabled={!!actionLoading[request.id]}
                              >
                                {actionLoading[request.id] ? "Processing..." : "Reject"}
                              </button>
                            </>
                          ) : (
                            <span className="sup-no-action">No actions available</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sup-empty">No requests found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusClasses = {
    pending: "sup-status-pending",
    accepted: "sup-status-active",
    rejected: "sup-status-disabled",
  };

  return (
    <span className={`sup-status-badge ${statusClasses[status] || ""}`}>
      {status}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

export default Requests;