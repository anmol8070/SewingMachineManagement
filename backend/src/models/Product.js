const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g., Industrial, Domestic
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String },
  images: [{ url: String, public_id: String }],
  specifications: { type: Map, of: String },
  warrantyPeriod: { type: Number, required: true, default: 12 }, // In months
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
