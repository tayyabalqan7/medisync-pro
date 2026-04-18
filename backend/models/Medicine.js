const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  generic_name: { type: String, trim: true },
  brand_names: [String],
  category: { type: String, required: true },
  uses: [String],
  side_effects: [String],
  dosage: String,
  interactions: [String],
  price_pkr: Number,
  manufacturer: String,
  requires_prescription: { type: Boolean, default: false },
  description: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

medicineSchema.index({ name: 'text', generic_name: 'text', category: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
