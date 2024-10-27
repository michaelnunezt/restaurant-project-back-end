const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  method: {
    type: String,
    required: true,
  },

  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],

  cuisineType: {
    type: String,
  },

  cookingTime: {
    type: Number,
    required: true,
  },

  garnish: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food