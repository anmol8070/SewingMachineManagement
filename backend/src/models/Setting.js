const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  storeAddress: { type: String },
  storePhone: { type: String },
  storeEmail: { type: String },
  gstNumber: { type: String },
  logoUrl: { type: String },
  defaultWarrantyMonths: { type: Number, default: 12 },
  termsAndConditions: { type: String }
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
