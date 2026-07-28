const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  saleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  serialNumber: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Void'], default: 'Active' },
  warrantyCertificateUrl: { type: String }
}, { timestamps: true });

const Warranty = mongoose.model('Warranty', warrantySchema);
module.exports = Warranty;
