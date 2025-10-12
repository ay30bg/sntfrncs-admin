import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => navigate("/");

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header onLogout={logout} />
        <div className="content">
          <h2>Overview</h2>
          <div className="stats">
            <div className="card">🛍️ Products: 3</div>
            <div className="card">💰 Sales: ₦0</div>
            <div className="card">👥 Users: 0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
