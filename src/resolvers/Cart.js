
const { UserInputError } = require('apollo-server-express');
const { Cart, CartItem, Product } = require('../../models');
const typeDefs = require('../typeDefs/Cart');

const resolvers = {
  Query: {
    getCart: async (_, { id }) => {
      const cart = await Cart.findByPk(id, {
        include: { model: CartItem, include: { model: Product } },
      });
      if (!cart) {
        throw new UserInputError(`Cart with id ${id} not found`);
      }
      return cart;
    },
  },
  Mutation: {
    createCart: async (_, { userId }) => {
      const cart = await Cart.create({ userId });
      return cart;
    },
    addItemToCart: async (_, { cartId, productId, quantity, price }) => {
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        throw new UserInputError(`Cart with id ${cartId} not found`);
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new UserInputError(`Product with id ${productId} not found`);
      }
      const cartItem = await CartItem.create({ cartId, productId, quantity, price });
      return cartItem;
    },
    removeItemFromCart: async (_, { id }) => {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        throw new UserInputError(`CartItem with id ${id} not found`);
      }
      await cartItem.destroy();
      return cartItem;
    },
  },
};

module.exports = { resolvers, typeDefs };
