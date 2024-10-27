const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cocktailRouter = require('./controllers/cocktails.js');
const foodRouter = require('./controllers/foods.js');


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}.`);
});


app.use(express.json());


//Routes
app.use('/cocktails', cocktailRouter);
app.use('/foods', foodRouter);



app.listen(3000, () => {
  console.log('The express app is ready!');
});