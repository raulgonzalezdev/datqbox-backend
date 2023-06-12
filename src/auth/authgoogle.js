const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const User = require('../../models/user');
const { generateToken , verifyToken } = require('./auth')

dotenv.config();

const verifyGoogleToken = async (token) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    return { email, name };
  } catch (error) {
    console.error('Error decodificando el token de Google:', error);
    throw new Error('Token de Google inválido');
  }
};

const authenticateWithGoogle = async (token) => {
    const { email, name } = await verifyGoogleToken(token);
  
    let user = await User.findOne({ email });
  
    if (!user) {
      user = new User({
        firstName: name,
        lastName: '.',
        email: email,
        password: '',
        avatar: '',
        role: 'USER',
        is_superuser: false,
        is_active: true,
      });
      await user.save();
    }
  
    const authToken = generateToken(user);
  
    return authToken;
  };
  

module.exports = { authenticateWithGoogle };
