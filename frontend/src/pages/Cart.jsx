import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Message from "../components/Message.jsx";

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, itemsPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Message type="info">
          Your cart is empty. <Link to="/" className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent font-semibold">Continue shopping →</Link>
        </Message>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent mb-6">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div key={item.product} className="card flex items-center gap-4 p-4 hover:shadow-lg transition-shadow">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-semibold text-slate-800">{item.name}</p>
              <p className="text-slate-500 text-sm">${item.price.toFixed(2)} each</p>
            </div>
            <select
              value={item.qty}
              onChange={(e) => updateQty(item.product, Number(e.target.value))}
              className="input-field w-20"
            >
              {[...Array(item.stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
              ))}
            </select>
            <p className="font-semibold w-20 text-right bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">${(item.price * item.qty).toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.product)}
              className="text-red-500 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-2 py-1 rounded transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
        <div>
          <p className="text-slate-500 text-sm">Subtotal</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">${itemsPrice.toFixed(2)}</p>
        </div>
        <button onClick={() => navigate("/checkout")} className="btn-primary">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
