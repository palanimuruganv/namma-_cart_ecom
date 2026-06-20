import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/axios.js";
import Message from "../components/Message.jsx";

const Checkout = () => {
  const { cartItems, itemsPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: "", city: "", postalCode: "", country: "" });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/orders", {
        items: cartItems.map((item) => ({ product: item.product, qty: item.qty })),
        shippingAddress: form,
        paymentMethod,
      });
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Message type="info">Your cart is empty.</Message>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-4">Shipping details</h1>
        {error && <Message type="error">{error}</Message>}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
          <input name="address" required value={form.address} onChange={handleChange} className="input-field" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
            <input name="city" required value={form.city} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Postal code</label>
            <input name="postalCode" required value={form.postalCode} onChange={handleChange} className="input-field" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
          <input name="country" required value={form.country} onChange={handleChange} className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Payment method</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="input-field">
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
        </div>

        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Placing order..." : "Place order"}
        </button>
      </form>

      <div className="card p-6 h-fit bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
        <h2 className="font-bold text-xl bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-4">Order summary</h2>
        <div className="space-y-3 mb-4">
          {cartItems.map((item) => (
            <div key={item.product} className="flex justify-between text-sm text-slate-700">
              <span className="font-medium">{item.name} × {item.qty}</span>
              <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-slate-300 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>${itemsPrice.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-600"><span>Shipping</span><span className={shippingPrice === 0 ? "text-green-600 font-semibold" : ""}>{shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}</span></div>
          <div className="flex justify-between font-bold text-base pt-3 bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
