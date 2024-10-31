const { default: mongoose } = require("mongoose");
const Cocktail = require("../models/cocktail.js");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token.js");

// Create
router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.ownerId = req.user._id;
    const createdCocktail = await Cocktail.create(req.body);
    res.status(201).json(createdCocktail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Index
router.get("/", async (req, res) => {
  try {
    const foundCocktails = await Cocktail.find();
    return res.json(foundCocktails);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Show
router.get("/:cocktailId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.cocktailId)) {
      return res.status(400).json({ error: "Invalid cocktail ID" });
    }

    const cocktail = await Cocktail.findById(req.params.cocktailId);
    if (!cocktail) return res.status(404).json({ error: "Cocktail not found" });
    return res.json(cocktail);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/:cocktailId", verifyToken, async (req, res) => {
  try {

    //Find CocktailId
    const cocktail = await Cocktail.findById(req.params.cocktailId);


    //check permissions
    if (!cocktail.ownerId.equals(req.user._id)) {
      return res.status(403).json({ error: "Not Allowed" });
    }

    //Delete Cocktail
    await Cocktail.findByIdAndDelete(req.params.cocktailId);

    //Issue json resp
    res.status(200).json({ message: "Cocktail deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/:cocktailId", verifyToken, async (req, res) => {
  try {
    // Find CocktailId
    const cocktail = await Cocktail.findById(req.params.cocktailId);
    
    //Check permissions
    if (!cocktail.ownerId.equals(req.user._id)) {
      return res.status(403).json({ error: "Not Allowed" });
    }

    // Update the Cocktail
    const updatedCocktail = await Cocktail.findByIdAndUpdate(
      req.params.cocktailId,
      req.body,
      { new: true }
    );

    // Json Response
    res.status(200).json(updatedCocktail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
