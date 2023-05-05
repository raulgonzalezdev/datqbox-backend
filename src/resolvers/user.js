const db = require('../../models');
const { User, Address, Cart, Order, Review, Company } = db;
const bcrypt = require('bcryptjs');
const { generateToken } = require('../auth/auth');

const UserResolvers = {
  Query: {
    user: async (parent, { id }) => {
      try {
        const user = await User.findByPk(id, {
          include: [
            Address,
            Cart,
            Order,
            Review,
            Company
          ]
        });
        return user;
      } catch (err) {
        throw new Error(`Error fetching user with id ${id}: ${err}`);
      }
    },
    users: async () => {
      try {
        const users = await User.findAll({
          include: [
            Address,
            Cart,
            Order,
            Review,
            Company
          ]
        });
        return users;
      } catch (err) {
        throw new Error(`Error fetching users: ${err}`);
      }
    }
  },
  Mutation: {
    addUser: async (parent, { input }) => {
      try {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await User.create({ ...input, password: hashedPassword });
        const token = generateToken(user);
        return {
          token,
          user,
        };
      } catch (err) {
        throw new Error(`Error adding user: ${err}`);
      }
    },
    updateUser: async (parent, { id, input }) => {
      try {
        await User.update(input, { where: { id } });
        const updatedUser = await User.findByPk(id);
        return updatedUser;
      } catch (err) {
        throw new Error(`Error updating user with id ${id}: ${err}`);
      }
    },
    deleteUser: async (parent, { id }) => {
      try {
        const user = await User.findByPk(id);
        await user.destroy();
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
