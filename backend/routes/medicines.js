const express = require('express');
const medicinesData = require('../data/medicines');
const interactionsData = require('../data/interactions');

const router = express.Router();

router.get('/', (req, res) => {
  const { search, category, page = 1, limit = 20 } = req.query;
  let results = [...medicinesData];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.generic_name?.toLowerCase().includes(q) ||
      m.brand_names?.some(b => b.toLowerCase().includes(q)) ||
      m.category?.toLowerCase().includes(q)
    );
  }

  if (category) {
    results = results.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + parseInt(limit));

  res.json({ medicines: paginated, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

router.get('/categories', (req, res) => {
  const categories = [...new Set(medicinesData.map(m => m.category))];
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const medicine = medicinesData.find(m => m.id === parseInt(req.params.id));
  if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
  res.json(medicine);
});

router.post('/interactions/check', (req, res) => {
  const { medicines } = req.body;
  if (!medicines || medicines.length < 2) {
    return res.status(400).json({ message: 'Provide at least 2 medicines' });
  }

  const found = [];
  for (let i = 0; i < medicines.length; i++) {
    for (let j = i + 1; j < medicines.length; j++) {
      const d1 = medicines[i].toLowerCase();
      const d2 = medicines[j].toLowerCase();
      const interaction = interactionsData.find(it =>
        (it.drug1.toLowerCase().includes(d1) || d1.includes(it.drug1.toLowerCase())) &&
        (it.drug2.toLowerCase().includes(d2) || d2.includes(it.drug2.toLowerCase())) ||
        (it.drug1.toLowerCase().includes(d2) || d2.includes(it.drug1.toLowerCase())) &&
        (it.drug2.toLowerCase().includes(d1) || d1.includes(it.drug2.toLowerCase()))
      );
      if (interaction) found.push(interaction);
    }
  }

  res.json({ interactions: found, count: found.length });
});

module.exports = router;
