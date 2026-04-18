const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: String,
  hospital: String,
  date: { type: Date, default: Date.now },
  medicines: [{
    name: { type: String, required: true },
    genericName: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String,
    refillsLeft: { type: Number, default: 0 }
  }],
  diagnosis: String,
  notes: String,
  isActive: { type: Boolean, default: true },
  nextRefillDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
