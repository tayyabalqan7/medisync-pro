const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['prescription', 'lab_report', 'diagnosis', 'vaccination', 'surgery', 'other'],
    required: true
  },
  doctor: String,
  hospital: String,
  date: { type: Date, default: Date.now },
  diagnosis: String,
  medicines: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    notes: String
  }],
  notes: String,
  attachments: [String],
  extractedText: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PatientRecord', patientRecordSchema);
