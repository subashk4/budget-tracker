const bcrypt = require('bcryptjs');
exports.validatePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};
