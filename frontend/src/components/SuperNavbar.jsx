import React from "react";
import { NavLink } from "react-router-dom";

function SuperNavbar({ onRefresh, refreshing, onLogout }) {
  const navItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Requests", to: "/requests" },
    { label: "Centers", to: "/centers" },
    { label: "Payments", to: "/payments" },
    { label: "Activity Logs", to: "/activity-logs" },
    { label: "Settings", to: "/settings" },
  ];

  return (
    <header className="sup-navbar">
      <div className="sup-navbar-brand">
        <div className="sup-brand-mark">F</div>
        <div className="sup-brand-text">
          <h2>FormInnova</h2>
          <p>Welcome back, Admin</p>
        </div>
      </div>

      <nav className="sup-navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sup-nav-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sup-navbar-actions">
        <button
          className="sup-btn sup-btn-light"
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>

        <button className="sup-btn sup-btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default SuperNavbar;