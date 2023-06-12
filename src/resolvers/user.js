const db = require('../../models');
const { User, Address, Cart, Order, Review, Company } = db;
const bcrypt = require('bcryptjs');
const { generateToken , verifyToken} = require('../auth/auth');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const client = require('../redis/redisClient');

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e7c2cb8c981b2c",
    pass: "4930bb8c3b23d2"
  }
});

const UserResolvers = {
  Query: {
    user: async (parent, { id }) => {
      try {
        let user = await client.get(`user:${id}`);
        if (!user) {
          user = await User.findByPk(id, {
            include: [
              Address,
              Cart,
              Order,
              Review,
              Company
            ]
          });
          await client.set(`user:${id}`, JSON.stringify(user));
        } else {
          user = JSON.parse(user);
        }
        return user;
      } catch (err) {
        throw new Error(`Error fetching user with id ${id}: ${err}`);
      }
    },
    users: async () => {
      try {
        let users = await client.get('users');
        if (!users) {
          users = await User.findAll({
            include: [
              Address,
              Cart,
              Order,
              Review,
              Company
            ]
          });
          await client.set('users', JSON.stringify(users));
        } else {
          users = JSON.parse(users);
        }
        return users;
      } catch (err) {
        throw new Error(`Error fetching users: ${err}`);
      }
    },
    validateToken: async (_, { token }) => {
      const decodedToken = verifyToken(token);
      if (decodedToken !== null) {
        return true;
      } else {
        return false;
      }
    },
  },
  Mutation: {
    addUser: async (parent, { input }) => {
      try {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await User.create({ ...input, password: hashedPassword });
        const token = generateToken(user);
        await client.del('users');
        return {
          token,
          user,
        };
      } catch (err) {
        if (err.code === '23505') { 
          throw new Error('Este correo electrónico ya está en uso');
        }
        throw new Error(`Error adding user: ${err}`);
      }
    },
    updateUser: async (parent, { id, input }) => {
      try {
        await User.update(input, { where: { id } });
        const updatedUser = await User.findByPk(id);
        await client.del(`user:${id}`);
        await client.del('users');
        return updatedUser;
      } catch (err) {
        throw new Error(`Error updating user with id ${id}: ${err}`);
      }
    },
    deleteUser: async (parent, { id }) => {
      try {
        const user = await User.findByPk(id);
        await user.destroy();
        await client.del(`user:${id}`);
        await client.del('users');
        return user;
      } catch (err) {
        throw new Error(`Error deleting user with id ${id}: ${err}`);
      }
    },
    loginUser: async (parent, { input }) => {
      try {
        const { email, password } = input;
        const user = await User.findOne({ where: { email } });
  
        if (!user) {
          throw new Error('User not found');
        }
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          throw new Error('Incorrect password');
        }
  
        const token = generateToken(user);
  
        return {
          token,
          user,
        };
      } catch (err) {
        throw new Error(`Error logging in user: ${err}`);
      }
    },
    forgotPassword: async (parent, { email }) => {
      try {
        const user = await User.findOne({ where: { email } });
  
        if (!user) {
          throw new Error('User not found');
        }
  
        const resetToken = crypto.randomBytes(20).toString('hex');
  
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();
  
        await transporter.sendMail({
          to: user.email,
          from: 'your-email@example.com',
          subject: 'Reset Password',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${resetToken}">link</a> to set a new password.</p>
          `,
        });
  
        return true;
      } catch (err) {
        throw new Error(`Error sending password reset email: ${err}`);
      }
    },
    resetPassword: async (parent, { token, password }) => {
      try {
        const user = await User.findOne({
          where: {
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
          },
        });
  
        if (!user) {
          throw new Error('Invalid or expired token');
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        await user.save();
  
        return true;
      } catch (err) {
        throw new Error(`Error resetting password: ${err}`);
      }
    },
  },
  

  User: {
    addresses: async (user) => {
      try {
        const addresses = await Address.findAll({
          where: { userId: user.id }
        });
        return addresses;
      } catch (err) {
        throw new Error(`Error fetching addresses for user ${user.id}: ${err}`);
      }
    },
    carts: async (user) => {
      try {
        const carts = await Cart.findAll({
          where: { userId: user.id }
        });
        return carts;
      } catch (err) {
        throw new Error(`Error fetching carts for user ${user.id}: ${err}`);
      }
    },
  }
};
      
module.exports = UserResolvers;
