const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      process.env.DB_LINK, 
      { useNewUrlParser: true }
    );
  } catch (err) {
    console.error('Error connecting to mongodb');
    console.error(err);
  }
}

module.exports = { connect };