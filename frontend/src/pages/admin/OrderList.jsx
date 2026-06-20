import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

const statusColor = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderListAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-6">Orders</h1>
      {error && <div className="mb-4"><Message type="error">{error}</Message></div>}

      <div className="card overflow-hidden shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-brand-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 font-semibold text-left">Order</th>
              <th className="px-4 py-3 font-semibold text-left">Customer</th>
              <th className="px-4 py-3 font-semibold text-left">Date</th>
              <th className="px-4 py-3 font-semibold text-left">Total</th>
              <th className="px-4 py-3 font-semibold text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, idx) => (
              <tr key={o._id} className={`border-t border-slate-100 ${idx % 2 === 0 ? "bg-blue-50/30" : ""} hover:bg-blue-50 transition-colors`}>
                <td className="px-4 py-3 font-bold text-brand-600">#{o._id.slice(-8)}</td>
                <td className="px-4 py-3"><span className="font-medium text-slate-800">{o.user?.name}</span> <br /><span className="text-slate-500 text-xs">{o.user?.email}</span></td>
                <td className="px-4 py-3 text-slate-600">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-bold bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">${o.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer transition-all ${statusColor[o.status]}`}
                  >
                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListAdmin;
