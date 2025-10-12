// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import "../styles/admin.css";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const logout = () => navigate("/");

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Header onLogout={logout} />
//         <div className="content">
//           <h2>Overview</h2>
//           <div className="stats">
//             <div className="card">🛍️ Products: 3</div>
//             <div className="card">💰 Sales: ₦0</div>
//             <div className="card">👥 Users: 0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => navigate("/");

  // Stats
  const [stats, setStats] = useState({ products: 3, sales: 0, users: 0 });

  // Weekly Sales
  const [salesData, setSalesData] = useState([
    { day: "Mon", sales: 0 },
    { day: "Tue", sales: 0 },
    { day: "Wed", sales: 0 },
    { day: "Thu", sales: 0 },
    { day: "Fri", sales: 0 },
    { day: "Sat", sales: 0 },
    { day: "Sun", sales: 0 },
  ]);

  // Recent Orders
  const [recentOrders, setRecentOrders] = useState([
    { id: "#001", customer: "John Doe", total: 2500, status: "Pending" },
    { id: "#002", customer: "Jane Smith", total: 4000, status: "Completed" },
    { id: "#003", customer: "Mike Johnson", total: 3200, status: "Processing" },
  ]);

  useEffect(() => {
    // Placeholder demo data
    setStats({ products: 12, sales: 54000, users: 18 });
    setSalesData([
      { day: "Mon", sales: 5000 },
      { day: "Tue", sales: 8000 },
      { day: "Wed", sales: 7000 },
      { day: "Thu", sales: 10000 },
      { day: "Fri", sales: 9000 },
      { day: "Sat", sales: 4000 },
      { day: "Sun", sales: 8000 },
    ]);
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header onLogout={logout} />
        <div className="content">
          <h2>Overview</h2>

          {/* Stats Cards */}
          <div className="stats">
            <div className="card">🛍️ Products: {stats.products}</div>
            <div className="card">💰 Sales: ₦{stats.sales}</div>
            <div className="card">👥 Users: {stats.users}</div>
          </div>

          {/* Sales Chart */}
          <h3>Weekly Sales</h3>
          <div className="chart-container" style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={salesData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders Table */}
          <h3>Recent Orders</h3>
          <div className="recent-orders">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total (₦)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
