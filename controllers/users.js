const express = require('express');
const router = express.Router();
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

// Model
const User = require('../models/user')

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { password, confirmPassword, username } = req.body
    //Checking the pass match
    if(password !== confirmPassword) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Check for existing user in the database
    const userInDatabase = await User.findOne({ username: username })
    if(userInDatabase) {
      return res.status(400).json({ error: 'Username already taken' })
    }

    // Hash Password
    req.body.hashedPassword = bcrypt.hashSync(password, 10)

    // Creation of the user
    const user = await User.create(req.body)
    console.log(user)

    // Generate a jwt to send to the client
    const payload = {
      username: user.username,
      _id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })

    return res.status(201).json({ user: payload, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}) 

// Sign In
router.post('/signin', async (req,res) => {
  try {
    const {username, password } = req.body

    //checking the username exist in the database
    const useer = await User.findOne({ username })

    //check user exists
    if(!user) {
      console.log('Attempt failed as username was incorrect')
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Cmpare plain text password against the hash
    if(!bcrypt.compareSync(password, user.hashedPassword)) {
      console.log('Attempt failed as password was not correct')
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Generate JWT
    const payload = {
      username: user.username,
      _id: user._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })

    // Send the JWT back to client
    return res,json({ user: payload, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
})

module.exports = router