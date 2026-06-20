import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products", { params: { page: 1 } }),
          api.get("/orders"),
        ]);
        const orders = ordersRes.data;
        const revenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);
        setStats({
          totalProducts: productsRes.data.total,
          totalOrders: orders.length,
          revenue,
          pending: orders.filter((o) => o.status === "Processing").length,
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { label: "Total products", value: stats.totalProducts, color: "from-blue-500 to-cyan-500" },
    { label: "Total orders", value: stats.totalOrders, color: "from-purple-500 to-pink-500" },
    { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, color: "from-green-500 to-emerald-500" },
    { label: "Pending orders", value: stats.pending, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow`}>
            <p className="text-white/80 text-sm font-medium">{c.label}</p>
            <p className="text-3xl font-bold mt-2">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
