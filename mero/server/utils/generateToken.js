const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = async (payload, expiresIn) => {
  return await jwt.sign(payload, process.env.SECRET, { expiresIn });
};

exports.validateToken = async (token) => {
  return await jwt.verify(token, process.env.SECRET);
};

// exports.extractToken = (res) => res.headers['authentication'].split(' ')[0];
