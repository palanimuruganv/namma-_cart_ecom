import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Message from "../components/Message.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="card p-8 shadow-xl">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-6">Welcome back</h1>
          {error && <div className="mb-4"><Message type="error">{error}</Message></div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
            </div>
            <button disabled={loading} className="btn-primary w-full">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="text-sm text-slate-600 mt-5">
            New here? <Link to="/register" className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent font-semibold">Create an account</Link>
          </p>
          <p className="text-xs text-slate-500 mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
            Demo admin: admin@example.com / admin123 (after running the seed script)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
