import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const statusColor = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-6">My Orders</h1>
      {error && <Message type="error">{error}</Message>}
      {!error && orders.length === 0 && <Message type="info">You haven't placed any orders yet.</Message>}

      <div className="space-y-4">
        {orders.map((order) => (
          <Link to={`/order-success/${order._id}`} key={order._id} className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
            <div className="flex-1">
              <p className="font-bold text-slate-800">Order #{order._id.slice(-8)}</p>
              <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full my-2 sm:my-0 ${statusColor[order.status]}`}>
              {order.status}
            </span>
            <p className="font-bold text-lg bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">${order.totalPrice.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
