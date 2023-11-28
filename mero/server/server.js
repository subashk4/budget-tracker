const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

exports.main = async () => {
  const uri = process.env.ATLAS_URI;
  try {
    await mongoose.connect(uri);
    console.log('connected to the db successfully');
  } catch (error) {
    console.log(error);
  }
};
