const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
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

  glassType: {
    type: String,
    required: true,
  },

  garnish: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail