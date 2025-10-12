import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Classic Hoodie", price: "25000", stock: 10 },
    { id: 2, name: "Streetwear Cap", price: "10000", stock: 25 },
  ]);

  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const newProduct = { id: Date.now(), ...form };
    setProducts([...products, newProduct]);
    setForm({ name: "", price: "", stock: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const logout = () => (window.location.href = "/");

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header onLogout={logout} />

        <div className="content">
          <h2>Manage Products</h2>
          <form onSubmit={handleAdd} className="product-form">
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₦)"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
            />
            <button type="submit">Add Product</button>
          </form>

          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price (₦)</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => handleDelete(p.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
