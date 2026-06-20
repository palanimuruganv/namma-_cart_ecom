import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", { params: { page: 1 } });
      setProducts(data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">Products</h1>
        <Link to="/admin/products/new" className="btn-primary">+ Add product</Link>
      </div>

      {error && <div className="mb-4"><Message type="error">{error}</Message></div>}

      <div className="card overflow-hidden shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-brand-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 font-semibold text-left">Name</th>
              <th className="px-4 py-3 font-semibold text-left">Category</th>
              <th className="px-4 py-3 font-semibold text-left">Price</th>
              <th className="px-4 py-3 font-semibold text-left">Stock</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={p._id} className={`border-t border-slate-100 ${idx % 2 === 0 ? "bg-blue-50/30" : ""} hover:bg-blue-50 transition-colors`}>
                <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                <td className="px-4 py-3 text-slate-600">{p.category}</td>
                <td className="px-4 py-3 font-semibold bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{p.stock}</span></td>
                <td className="px-4 py-3 text-right space-x-4">
                  <Link to={`/admin/products/${p._id}/edit`} className="text-brand-600 hover:text-brand-700 font-semibold transition-colors">Edit</Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-700 font-semibold transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListAdmin;
