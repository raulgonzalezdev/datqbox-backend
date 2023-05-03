const { User, Address, Cart, Order, Review, Company } = require('../../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../auth/auth');

const resolvers = {
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
    }
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
      
module.exports = resolvers;
