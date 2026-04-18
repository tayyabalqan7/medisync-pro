const express = require('express');
const symptomsData = require('../data/symptoms');
const medicinesData = require('../data/medicines');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(symptomsData.map(s => ({ id: s.id, name: s.name, severity: s.severity })));
});

router.post('/analyze', (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || !symptoms.length) {
    return res.status(400).json({ message: 'Provide at least one symptom' });
  }

  const results = [];
  const medicineNames = new Set();

  for (const symptomName of symptoms) {
    const found = symptomsData.find(s =>
      s.name.toLowerCase().includes(symptomName.toLowerCase()) ||
      symptomName.toLowerCase().includes(s.name.toLowerCase())
    );
    if (found) {
      results.push(found);
      found.recommended_medicines.forEach(m => medicineNames.add(m));
    }
  }

  const relatedMedicines = medicinesData.filter(m =>
    [...medicineNames].some(name =>
      m.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(m.name.toLowerCase())
    )
  ).slice(0, 10);

  res.json({ symptoms: results, relatedMedicines, analyzed: results.length });
});

router.get('/:id', (req, res) => {
  const symptom = symptomsData.find(s => s.id === parseInt(req.params.id));
  if (!symptom) return res.status(404).json({ message: 'Symptom not found' });
  res.json(symptom);
});

module.exports = router;
