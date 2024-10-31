const mongoose = require('mongoose');


const cocktailSchema = mongoose.Schema({
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

  ingredients: [{
    type: String,
  }
  ],

  glassType: {
    type: String,
    required: true,
  },

  garnish: String,


  ownerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

},{
  timestamps: true
});


const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail