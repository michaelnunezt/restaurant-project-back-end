const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const cocktailRouter = require('./controllers/cocktails.js');
const foodRouter = require('./controllers/foods.js');


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}.`);
});

//! Middleware
// converting JSON req bodies into JS, adding it to req.body
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


//! Routes
app.use('/cocktails', cocktailRouter);
app.use('/foods', foodRouter);



app.listen(3000, () => {
  console.log('The express app is ready!');
});