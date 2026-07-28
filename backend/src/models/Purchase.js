const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  supplierContact: { type: String },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      unitCost: { type: Number, required: true },
      totalCost: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Completed' },
  notes: { type: String }
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
