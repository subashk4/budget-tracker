const mongoose = require('mongoose');
const { generateToken } = require('../utils/generateToken');

const tokenSchema = mongoose.Schema({
  token: String,
});

// tokenSchema.methods.generateToken = async (payload) => {
//   this.token = await generateToken(payload, 60 * 60 * 24);
//   await this.save();
//   return this.token;
// };

// tokenSchema.pre('save', async function (next) {
//   this.token = await generateToken(payload, 60 * 60 * 24);
//   next();
// });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
