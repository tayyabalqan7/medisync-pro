require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicines');
const patientRoutes = require('./routes/patients');
const symptomRoutes = require('./routes/symptoms');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/symptoms', symptomRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MediSync Pro API is running', timestamp: new Date() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const startServer = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
    } else {
      console.log('Running without MongoDB (demo mode)');
    }
    app.listen(PORT, () => console.log(`MediSync Pro API running on port ${PORT}`));
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

startServer();
