import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios.js";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";

const emptyForm = { name: "", description: "", price: "", category: "", stock: "", image: "" };

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          image: data.image,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-6">{isEdit ? "Edit product" : "Add product"}</h1>
      {error && <div className="mb-4"><Message type="error">{error}</Message></div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="card p-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
            <input name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Product name" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="input-field resize-none" placeholder="Product description" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
              <input type="number" step="0.01" min="0" name="price" required value={form.price} onChange={handleChange} className="input-field" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Stock</label>
              <input type="number" min="0" name="stock" required value={form.stock} onChange={handleChange} className="input-field" placeholder="0" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <input name="category" required value={form.category} onChange={handleChange} className="input-field" placeholder="e.g., Electronics" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="input-field" />
          </div>
        </div>
        <button disabled={saving} className="btn-primary w-full py-3 font-semibold text-lg">
          {saving ? "Saving..." : isEdit ? "Save changes" : "Create product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
