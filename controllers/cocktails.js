const { default: mongoose } = require('mongoose');
const Cocktail = require('../models/cocktail.js');
const express = require('express');
const router = express.Router();


// Create
router.post('/', async (req, res) => {
  try {
    const createdCocktail = await Cocktail.create(req.body);
    res.status(201).json(createdCocktail);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Index
router.get('/', async (req, res) => {
  try {
    const foundCocktails = await Cocktail.find();
    return res.json(foundCocktails)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
});


// Show 
router.get('/:cocktailId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.cocktailId)) {
      return res.status(400).json({ error: 'Invalid cocktail ID' });
    }

    const cocktail = await Cocktail.findById(req.params.cocktailId)
    if (!cocktail) return res.status(404).json({ error: 'Cocktail not found' })
      return res.json(cocktail)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
});

// Delete
router.delete('/:cocktailId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.cocktailId)){
      return res.status(400).json({ error: 'Invalid cocktail ID'})
  }
  const deletedCocktail = await Cocktail.findByIdAndDelete(req.params.cocktailId   )

  if(!deletedCocktail) return res.status(404).json({ error: 'Cocktail not found'})
  return res.json(deletedCocktail)
} catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});


// Update
router.put('/:cocktailId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.cocktailId)){
      return res.status(400).json({ error: 'Invalid cocktail ID'})
  }
  // Attempt to update the document
  const updatedCocktail = await Cocktail.findByIdAndUpdate(req.params.cocktailId, req.body, { new: true })

  //If document not found, send 404
  if(!updatedCocktail) return res.status(404).json({ error: 'Cocktail not found' })
  return res.json(updatedCocktail)
  } catch (error) {
    console.log(error);
    return res.status(500).jason({ error: error.message });
  }
})


module.exports = router;