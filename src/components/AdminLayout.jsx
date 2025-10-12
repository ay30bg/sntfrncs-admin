import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import "../styles/admin.css";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* ===== Menu Toggle Button (Mobile) ===== */}
      <button
        className="menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </button>

      {/* ===== Sidebar ===== */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      {/* ===== Main Content ===== */}
      <main className="admin-main" onClick={() => setIsSidebarOpen(false)}>
        {children}
      </main>
    </div>
  );
}
