const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String }, // In case it's not in the system
  issueDescription: { type: String, required: true },
  estimatedCost: { type: Number, default: 0 },
  status: { type: String, enum: ['Received', 'In Progress', 'Completed', 'Delivered'], default: 'Received' },
  receiveDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  technicianNotes: { type: String }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
