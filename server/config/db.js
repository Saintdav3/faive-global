const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  const connection = await mongoose.connect(uri);
  return connection;
};

module.exports = connectDB;
