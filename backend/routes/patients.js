const express = require('express');
const mongoose = require('mongoose');
const PatientRecord = require('../models/PatientRecord');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid record ID' });
  }
  next();
};

router.get('/', async (req, res) => {
  try {
    const records = await PatientRecord.find({ user: req.user._id, isActive: true })
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const record = await PatientRecord.create({ ...req.body, user: req.user._id });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const record = await PatientRecord.findOne({ _id: req.params.id, user: req.user._id });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateObjectId, async (req, res) => {
  try {
    // Whitelist allowed update fields
    const { title, type, doctor, hospital, date, diagnosis, medicines, notes, attachments } = req.body;
    const safeUpdate = { title, type, doctor, hospital, date, diagnosis, medicines, notes, attachments };
    const record = await PatientRecord.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: safeUpdate },
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    await PatientRecord.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { isActive: false } }
    );
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
