const client = require('../redis/redisClient');
const { UserInputError } = require('apollo-server');
const { Cart, CartItem, Product } = require('../../models');

const CartResolvers = {
  Query: {
    getCart: async (_, { id }) => {
      let cart = await client.get(`cart:${id}`);
      if (!cart) {
        cart = await Cart.findByPk(id, {
          include: { model: CartItem, include: { model: Product } },
        });
        if (!cart) {
          throw new UserInputError(`Cart with id ${id} not found`);
        }
        await client.set(`cart:${id}`, JSON.stringify(cart));
      } else {
        cart = JSON.parse(cart);
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
      await client.del(`cart:${cartId}`);
      return cartItem;
    },
    removeItemFromCart: async (_, { id }) => {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        throw new UserInputError(`CartItem with id ${id} not found`);
      }
      await cartItem.destroy();
      await client.del(`cart:${cartItem.cartId}`);
      return cartItem;
    },
  },
};

module.exports = CartResolvers;

