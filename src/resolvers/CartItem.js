const { CartItem, Cart, Product } = require('../../models');

const resolvers = {
  Query: {
    getCartItems: async (parent, { cartId }) => {
      const cartItems = await CartItem.findAll({
        where: { cartId },
        include: [{ model: Product }]
      });
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
      return cartItem;
    },
    updateCartItem: async (parent, { id, quantity }) => {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        throw new Error(`Cart item with id ${id} not found`);
      }
      cartItem.quantity = quantity;
      await cartItem.save();
      return cartItem;
    },
    deleteCartItem: async (parent, { id }) => {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        throw new Error(`Cart item with id ${id} not found`);
      }
      await cartItem.destroy();
      return true;
    },
  },
};

module.exports = resolvers;
