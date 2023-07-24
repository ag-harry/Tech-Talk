const router = require('express').Router();

// Import all the routes
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const commentRoutes = require('./commentRoutes');

// Connect the imported routes to their respective endpoints
router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comments', commentRoutes);

// Export the router
module.exports = router;
