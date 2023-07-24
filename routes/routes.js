const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Import user-related routes
const postRoutes = require('./postRoutes'); // Import post-related routes
const postRoutes = require('./homeRoutes'); // Import post-related routes
const postRoutes = require('./commentRoutes'); // Import post-related routes
const postRoutes = require('./dashboardRoutes'); // Import post-related routes

// Home page route
router.get('/', (req, res) => {
  // Render the homepage template .hbs
  res.render('homepage');
});

// User routes
router.use('/user', userRoutes);

// Post routes
router.use('/posts', postRoutes);

module.exports = router;
