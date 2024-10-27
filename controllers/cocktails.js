const Cocktail = require('../models/cocktail.js');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const createdCocktail = await Cocktail.create(req.body);
    res.status(201).json(createdCocktail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const foundCocktails = await Cocktail.find();
    res.status(200).json(foundCocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cocktailId', async (req, res) => {
  try {
    const foundCocktail = await Cocktail.findById(req.params.cocktailId);
    if (!foundCocktail) {
      res.status(404);
      throw new Error("Cocktail not found.");
    }
    res.status(200).json(foundCocktail);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});



module.exports = router;