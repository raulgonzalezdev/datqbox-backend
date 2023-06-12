const client = require('../redis/redisClient');
const { CartItem, Cart, Product } = require('../../models');

const CartItemResolvers = {
  Query: {
    getCartItems: async (parent, { cartId }) => {
      let cartItems = await client.get(`cartItems:${cartId}`);
      if (!cartItems) {
        cartItems = await CartItem.findAll({
          where: { cartId },
          include: [{ model: Product }]
        });
        await client.set(`cartItems:${cartId}`, JSON.stringify(cartItems));
      } else {
        cartItems = JSON.parse(cartItems);
      }
      return cartItems;
    },
  },
  Mutation: {
    addCartItem: async (parent, { cartId, productId, quantity, price }) => {
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        throw new Error(`Cart with id ${cartId} not found`);
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error(`Product with id ${productId} not found`);
      }
      const cartItem = await CartItem.create({ cartId, productId, quantity, price });
      await client.del(`cartItems:${cartId}`);
      return cartItem;
    },
    updateCartItem: async (parent, { id, quantity }) => {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        throw new Error(`Cart item with id ${id} not found`);
      }
      cartItem.quantity = quantity;
      await cartItem.save();
      await client.del(`cartItems:${cartItem.cartId}`);
      return cartItem;
    },
    deleteCartItem: async (parent, { id }) => {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        throw new Error(`Cart item with id ${id} not found`);
      }
      await cartItem.destroy();
      await client.del(`cartItems:${cartItem.cartId}`);
      return true;
    },
  },
};

module.exports = CartItemResolvers;
