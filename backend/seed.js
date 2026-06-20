// Run with: node seed.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();
await connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    const products = [
      { name: "Wireless Headphones", description: "Noise-cancelling over-ear headphones with 30hr battery life.", price: 79.99, category: "Electronics", stock: 25, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
      { name: "Running Shoes", description: "Lightweight breathable running shoes for daily training.", price: 59.99, category: "Footwear", stock: 40, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
      { name: "Smart Watch", description: "Fitness tracking smart watch with heart rate monitor.", price: 129.99, category: "Electronics", stock: 15, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
      { name: "Backpack", description: "Durable water-resistant backpack with laptop compartment.", price: 39.99, category: "Accessories", stock: 30, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
      { name: "Coffee Maker", description: "12-cup programmable drip coffee maker.", price: 49.99, category: "Home", stock: 20, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600" },
      { name: "Yoga Mat", description: "Non-slip eco-friendly yoga mat, 6mm thick.", price: 24.99, category: "Sports", stock: 50, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600" },
    ];

    await Product.insertMany(products);

    console.log("Seed data inserted successfully.");
    console.log("Admin login: admin@example.com / admin123");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
