const express = require('express');
const session = require('express-session');
const sessionOptions = require('./config/session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const path = require('path');

// Importing routes
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3006;

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// Configure session middleware
app.use(session(sessionOptions));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.use('/api', routes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
