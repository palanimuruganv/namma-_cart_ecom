import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Link to={`/product/${product._id}`} className="card overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-blue-100 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <p className="text-xs uppercase tracking-wide bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-1">
        {product.category}
      </p>
      <h3 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-brand-600 transition-colors">{product.name}</h3>
      <div className="flex items-center justify-between mt-3">
        <span className="text-lg font-bold bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
        {product.stock === 0 ? (
          <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded-full">Out of stock</span>
        ) : (
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{product.stock} in stock</span>
        )}
      </div>
    </div>
  </Link>
);

export default ProductCard;
