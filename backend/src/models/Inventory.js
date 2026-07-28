const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['IN', 'OUT'], required: true },
  quantity: { type: Number, required: true },
  referenceType: { type: String, enum: ['Purchase', 'Sale', 'Adjustment'], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  notes: { type: String }
}, { timestamps: true });

const Inventory = mongoose.model('InventoryLog', inventorySchema);
module.exports = Inventory;
