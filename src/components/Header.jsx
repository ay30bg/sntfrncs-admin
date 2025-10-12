import React from "react";
import "../styles/admin.css";

export default function Header({ onLogout }) {
  return (
    <div className="header">
      <h3>Admin Panel</h3>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
