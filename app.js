const express = require('express');
const app = express();
const goalRoutes = require('./routes/goal.routes');
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

app.use(express.json());

app.use('/goals', goalRoutes)

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message})
})

app.get('/', (req, res) => {
  res.json('Welcome to my CRUD app!');
});

module.exports = app;