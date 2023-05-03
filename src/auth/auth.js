const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  generateToken: (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  },
};
