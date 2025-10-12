// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "../styles/admin.css";

// export default function Sidebar() {
//   const { pathname } = useLocation();

//   return (
//     <div className="sidebar">
//       <h2 className="logo">SNT FRNCS</h2>
//       <Link className={pathname === "/dashboard" ? "active" : ""} to="/dashboard">
//         Dashboard
//       </Link>
//       <Link className={pathname === "/products" ? "active" : ""} to="/products">
//         Products
//       </Link>
//     </div>
//   );
// }

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen } from "react-icons/fa";
import "../styles/admin.css";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">SNT FRNCS</h2>

      <Link
        className={`sidebar-link ${pathname === "/dashboard" ? "active" : ""}`}
        to="/dashboard"
      >
        <FaTachometerAlt className="icon" />
        <span className="label">Dashboard</span>
      </Link>

      <Link
        className={`sidebar-link ${pathname === "/products" ? "active" : ""}`}
        to="/products"
      >
        <FaBoxOpen className="icon" />
        <span className="label">Products</span>
      </Link>
    </div>
  );
}
