const Food = require('../models/food.js');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const createdFood = await Food.create(req.body);
    res.status(201).json(createdFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const foundFoods = await Food.find();
    res.status(200).json(foundFoods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;