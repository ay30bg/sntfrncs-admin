import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";

// ✅ Automatically use correct API base URL
const API_URL = process.env.REACT_APP_API_URL || "https://snt-frncs-backend-mauve.vercel.app/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    images: "",
    category: "",
    description: "",
    inStock: "",
    oldPrice: "",
    sizes: "",
    variations: [],
  });

  const [variationForm, setVariationForm] = useState({
    color: "",
    image: "",
    inStock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleVariationChange = (e) =>
    setVariationForm({ ...variationForm, [e.target.name]: e.target.value });

  const addVariation = () => {
    if (!variationForm.color || !variationForm.image) {
      alert("Variation requires color and image");
      return;
    }
    setForm({
      ...form,
      variations: [
        ...form.variations,
        { ...variationForm, inStock: parseInt(variationForm.inStock) || 0 },
      ],
    });
    setVariationForm({ color: "", image: "", inStock: "" });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.images || !form.category) {
      alert("Please fill all required fields!");
      return;
    }

    const productData = {
      name: form.name,
      price: parseFloat(form.price),
      images: form.images.split(",").map((img) => img.trim()),
      category: form.category,
      description: form.description,
      inStock: parseInt(form.inStock) || 0,
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
      sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()) : [],
      variations: form.variations,
    };

    try {
      const res = await axios.post(`${API_URL}/products`, productData);
      setProducts([...products, res.data]);
      setForm({
        name: "",
        price: "",
        images: "",
        category: "",
        description: "",
        inStock: "",
        oldPrice: "",
        sizes: "",
        variations: [],
      });
      setVariationForm({ color: "", image: "", inStock: "" });
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const logout = () => (window.location.href = "/");

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header onLogout={logout} />
        <div className="content">
          <h2>Manage Products</h2>

          {/* Add Product Form */}
          <form onSubmit={handleAddProduct} className="product-form">
            <input
              type="text"
              name="name"
              placeholder="Product Name*"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₦)*"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="images"
              placeholder="Image URLs (comma separated)*"
              value={form.images}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category*"
              value={form.category}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="inStock"
              placeholder="Stock"
              value={form.inStock}
              onChange={handleChange}
            />
            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={form.oldPrice}
              onChange={handleChange}
            />
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma separated)"
              value={form.sizes}
              onChange={handleChange}
            />

            {/* Variations Section */}
            <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
              <h4>Variations</h4>
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={variationForm.color}
                onChange={handleVariationChange}
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={variationForm.image}
                onChange={handleVariationChange}
              />
              <input
                type="number"
                name="inStock"
                placeholder="Stock"
                value={variationForm.inStock}
                onChange={handleVariationChange}
              />
              <button type="button" onClick={addVariation}>
                Add Variation
              </button>

              <ul>
                {form.variations.map((v, idx) => (
                  <li key={idx}>
                    {v.color} - Stock: {v.inStock}{" "}
                    <img src={v.image} alt={v.color} width="40" />
                  </li>
                ))}
              </ul>
            </div>

            <button type="submit">Add Product</button>
          </form>

          {/* Products Table */}
          
          <div className="table-container">
  <table className="product-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Category</th>
        <th>Images</th>
        <th>Variations</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p._id}>
          <td>{p.name}</td>
          <td>{p.price}</td>
          <td>{p.inStock}</td>
          <td>{p.category}</td>
          <td>
            {p.images?.map((img, i) => (
              <img key={i} src={img} alt={p.name} width="50" />
            ))}
          </td>
          <td>
            {p.variations?.map((v, i) => (
              <div key={i}>
                {v.color} - {v.inStock}{" "}
                <img src={v.image} alt={v.color} width="40" />
              </div>
            ))}
          </td>
          <td>
            <button
              className="delete-btn"
              onClick={() => handleDeleteProduct(p._id)}
            >
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
    </div>
  );
}



