import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useCart } from "../context/CartContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <Loader />;
  if (error) return <div className="max-w-4xl mx-auto px-4 py-8"><Message type="error">{error}</Message></div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-sm text-slate-600 hover:text-brand-600 font-medium mb-6 flex items-center gap-1">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="card overflow-hidden aspect-square shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-3">
            {product.category}
          </p>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{product.name}</h1>
          <p className="text-slate-600 text-lg mb-6">{product.description}</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent mb-6">${product.price.toFixed(2)}</p>

          {product.stock > 0 ? (
            <Message type="success">In stock ({product.stock} available)</Message>
          ) : (
            <Message type="error">Out of stock</Message>
          )}

          {product.stock > 0 && (
            <div className="flex items-center gap-4 mt-8">
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="input-field w-24"
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
              <button onClick={handleAddToCart} className="btn-primary flex-1">
                {added ? "✓ Added to cart!" : "Add to cart"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
