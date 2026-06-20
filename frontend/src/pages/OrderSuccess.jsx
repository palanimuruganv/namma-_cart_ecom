import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || "Order not found");
      }
    };
    fetchOrder();
  }, [id]);

  if (error) return <div className="max-w-2xl mx-auto px-4 py-12"><Message type="error">{error}</Message></div>;
  if (!order) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center">
      <div className="max-w-2xl mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">✓</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-3">Order placed successfully!</h1>
          <p className="text-slate-600 text-lg">Order ID: <span className="font-mono font-bold text-brand-600">{order._id}</span></p>
        </div>

        <div className="card p-8 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl">
          <h2 className="font-bold text-xl mb-4 text-slate-800">Order Details</h2>
          <div className="space-y-3 mb-6">
            {order.items.map((item, idx) => (
              <div key={item.product} className={`flex justify-between text-sm py-2 px-3 rounded-lg ${idx % 2 === 0 ? "bg-white/50" : "bg-blue-50"}`}>
                <span className="font-medium text-slate-800">{item.name} × {item.qty}</span>
                <span className="font-bold bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-slate-300 pt-4 flex justify-between font-bold text-lg bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">
            <span>Total Amount</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Link to="/" className="btn-primary inline-block mt-8 w-full text-center py-3">Continue shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
