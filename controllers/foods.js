const { default: mongoose } = require('mongoose');
const Food = require('../models/food.js');
const express = require('express');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const createdFood = await Food.create(req.body);
    res.status(201).json(createdFood);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Index
router.get('/', async (req, res) => {
  try {

    const foundFoods = await Food.findOne({});
    return res.json(foundFoods)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
});


// Show 
router.get('/:foodId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.foodId)) {
      return res.status(400).json({ error: 'Invalid food ID' });
    }

    const food = await Food.findById(req.params.foodId)
    if (!food) return res.status(404).json({ error: 'Food not found' })
      return res.json(food)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
});

// Delete
router.delete('/:foodId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.foodId)){
      return res.status(400).json({ error: 'Invalid food ID'})
  }
  const deletedFood = await Food.findByIdAndDelete(req.params.foodId   )

  if(!deletedFood) return res.status(404).json({ error: 'Food not found'})
  return res.json(deletedFood)
} catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});


// Update
router.put('/:foodId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.foodId)){
      return res.status(400).json({ error: 'Invalid food ID'})
  }
  // Attempt to update the document
  const updatedFood = await Food.findByIdAndUpdate(req.params.foodId, req.body, { new: true })

  //If document not found, send 404
  if(!updatedFood) return res.status(404).json({ error: 'Food not found' })
  return res.json(updatedFood)
  } catch (error) {
    console.log(error);
    return res.status(500).jason({ error: error.message });
  }
})


module.exports = router;