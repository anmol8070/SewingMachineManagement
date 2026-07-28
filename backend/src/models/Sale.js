const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Bank Transfer'], default: 'Cash' },
  saleDate: { type: Date, default: Date.now },
  invoiceNumber: { type: String, required: true, unique: true },
  warrantyGenerated: { type: Boolean, default: false }
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;
