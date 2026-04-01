import { useCallback, useEffect, useMemo, useState } from "react";
import SuperNavbar from "../components/SuperNavbar";
import api from "../services/api";
import { logout } from "../services/authService";
import "../style/Payments.css";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const fetchPayments = useCallback(async (manualRefresh = false) => {
    try {
      setError("");
      if (manualRefresh) {
        setRefreshing(true);
      }

      const response = await api.get("/payments");
      setPayments(response.data || []);
    } catch (err) {
      console.error("Payments fetch error:", err);
      setError("Failed to load payments.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleRefresh = () => {
    fetchPayments(true);
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

  const years = useMemo(() => {
    const uniqueYears = [...new Set(payments.map((item) => item.year))].filter(Boolean);
    return uniqueYears.sort((a, b) => b - a);
  }, [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const centerName = payment.center?.name || "";

      const matchesSearch =
        centerName.toLowerCase().includes(search.toLowerCase()) ||
        String(payment.amount || "").includes(search) ||
        String(payment.year || "").includes(search);

      const matchesYear =
        selectedYear === "all" ? true : Number(payment.year) === Number(selectedYear);

      const matchesMonth =
        selectedMonth === "all" ? true : Number(payment.month) === Number(selectedMonth);

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [payments, search, selectedYear, selectedMonth]);

  const stats = useMemo(() => {
    const totalAmount = filteredPayments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0
    );

    const totalPayments = filteredPayments.length;

    const paidCenters = new Set(
      filteredPayments.map((payment) => payment.center?.name).filter(Boolean)
    ).size;

    return {
      totalAmount,
      totalPayments,
      paidCenters,
    };
  }, [filteredPayments]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="sup-page">
        <SuperNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onLogout={handleLogout}
        />
        <div className="sup-state-box">Loading payments...</div>
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
          <h2>Payments Error</h2>
          <p>{error}</p>
          <button className="sup-btn sup-btn-light" onClick={() => fetchPayments()}>
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
            <h1>Payments</h1>
            <p>Track all received payments from registered centers.</p>
          </div>

          <div className="sup-filters">
            <input
              type="text"
              placeholder="Search by center, amount or year"
              className="sup-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="sup-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>

            <select
              className="sup-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </section>

        <section className="sup-cards sup-payments-stats">
          <div className="sup-card sup-animate-up">
            <span>Total Payments</span>
            <h3>{stats.totalPayments}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.06s" }}>
            <span>Total Amount</span>
            <h3>{formatCurrency(stats.totalAmount)}</h3>
          </div>

          <div className="sup-card sup-animate-up" style={{ animationDelay: "0.12s" }}>
            <span>Paid Centers</span>
            <h3>{stats.paidCenters}</h3>
          </div>
        </section>

        <section className="sup-panel sup-animate-up">
          <div className="sup-panel-head">
            <div>
              <h3>Payments List</h3>
              <p>{filteredPayments.length} result(s)</p>
            </div>
          </div>

          {filteredPayments.length > 0 ? (
            <div className="sup-table-wrap">
              <table className="sup-table">
                <thead>
                  <tr>
                    <th>Center</th>
                    <th>Amount</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.center?.name || "-"}</td>
                      <td>{formatCurrency(payment.amount)}</td>
                      <td>{getMonthName(payment.month)}</td>
                      <td>{payment.year}</td>
                      <td>{formatDate(payment.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sup-empty">No payments found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

function getMonthName(month) {
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return months[month] || "-";
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

export default Payments;