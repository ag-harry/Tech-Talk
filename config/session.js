// configures the express-session middleware

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection');

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    // Set the session cookie options
    maxAge: 7200000, // 2 hours
    httpOnly: true,
    secure: false, // Set to true in a production environment with HTTPS enabled
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

module.exports = sessionOptions;
