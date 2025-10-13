// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import "../styles/admin.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const logout = () => navigate("/");

//   const [productsCount, setProductsCount] = useState(0);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
//         setProductsCount(res.data.length);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Header onLogout={logout} />
//         <div className="content">
//           <h2>Overview</h2>
//           <div className="stats">
//             <div className="card">🛍️ Products: {productsCount}</div>
//             <div className="card">💰 Sales: ₦0</div>
//             <div className="card">👥 Users: 0</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => navigate("/");

  const [productsCount, setProductsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProductsCount(res.data.length);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Listen for new orders in real-time
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("newOrder", (data) => {
      console.log("New order received:", data);
      setNotifications((prev) => [data, ...prev]);
      alert(`🆕 New Order Received!\nOrder ID: ${data.orderId}\nTotal: ₦${data.total}`);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header onLogout={logout} />
        <div className="content">
          <h2>Overview</h2>
          <div className="stats">
            <div className="card">🛍️ Products: {productsCount}</div>
            <div className="card">💰 Sales: ₦0</div>
            <div className="card">👥 Users: 0</div>
          </div>

          {/* ✅ Show live notifications */}
          <div className="notifications">
            <h3>Recent Orders</h3>
            {notifications.length === 0 ? (
              <p>No new orders yet</p>
            ) : (
              <ul>
                {notifications.map((order, idx) => (
                  <li key={idx}>
                    <strong>Order #{order.orderId}</strong> — ₦{order.total.toLocaleString()}<br />
                    <small>{order.time}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
