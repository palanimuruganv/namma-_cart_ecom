import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
    isActive ? "bg-gradient-primary text-white shadow-lg" : "text-slate-600 hover:bg-slate-100"
  }`;

const AdminLayout = () => (
  <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-[220px_1fr] gap-8">
    <aside className="space-y-2">
      <h2 className="font-display font-bold text-lg bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-4 px-2">Admin Panel</h2>
      <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
      <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
      <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
    </aside>
    <main>
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
