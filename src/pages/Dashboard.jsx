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

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => navigate("/");

  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProductsCount(productsRes.data.length);

        // Fetch orders
        const ordersRes = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
        const ordersData = ordersRes.data;
        setOrders(ordersData);
        setOrdersCount(ordersData.length);

        // Calculate total sales
        const sales = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
        setTotalSales(sales);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
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
            <div className="card">📦 Orders: {ordersCount}</div>
            <div className="card">💰 Total Sales: ₦{totalSales.toLocaleString()}</div>
            <div className="card">👥 Users: 0</div>
          </div>

          {/* ===== Orders Section ===== */}
          <div className="orders-section">
            <h2>Recent Orders</h2>

            {orders.length === 0 ? (
              <p className="no-orders">No orders yet.</p>
            ) : (
              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 8).map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderId}</td>
                        <td>{order.address?.fullName}</td>
                        <td>{order.email}</td>
                        <td>₦{order.total?.toLocaleString()}</td>
                        <td
                          className={`status ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


