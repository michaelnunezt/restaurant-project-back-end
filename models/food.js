const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
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

  ownerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

},{
  timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food