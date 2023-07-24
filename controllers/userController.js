const { User } = require('../models/User');
// require 'User' model from ../models.
// Define 'userController' object that contains methods for the user signup, login, and logout methods.

const userController = {
  // Implement user-related controller methods
  // User signup
  signup: async (req, res) => {
    // signup method creates a new user in the db using the provided -u and -p 
    // then saves the user's session information and redirects to homepage.
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.isAuthenticated = true;
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // User login
  login: async (req, res) => {
    // login method validates the -u and -p using the provided username and password.
    // Then saves the user's session information and redirects to homepage.
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user) {
        res.status(400).json({ message: 'Invalid username or password' });
        return;
      }

      const validPassword = await user.checkPassword(password);

      if (!validPassword) {
        res.status(400).json({ message: 'Invalid username or password' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.isAuthenticated = true;
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // User logout
  logout: (req, res) => {
    // Logout method destroys the user's session and redirects to the homepage.
    if (req.session.isAuthenticated) {
      req.session.destroy(() => {
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  },
};

module.exports = userController;

// routes/userRoutes.j =>