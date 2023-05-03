const { Order, User, OrderItem } = require('../../models');

const resolvers = {
  Query: {
    orders: async () => {
      const orders = await Order.findAll({
        include: ['orderItems']
      });
      return orders;
    },
    order: async (_, { id }) => {
      const order = await Order.findByPk(id, {
        include: ['orderItems']
      });
      return order;
    }
  },
  Mutation: {
    createOrder: async (_, { input }) => {
      const { userId, totalPrice, status } = input;
      const order = await Order.create({ userId, totalPrice, status });
      return order;
    },
    updateOrder: async (_, { id, input }) => {
      const { userId, totalPrice, status } = input;
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error(`Order with id ${id} not found`);
      }
      order.userId = userId;
      order.totalPrice = totalPrice;
      order.status = status;
      await order.save();
      return order;
    },
    deleteOrder: async (_, { id }) => {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error(`Order with id ${id} not found`);
      }
      await order.destroy();
      return true;
    }
  },
  Order: {
    orderItems: async (parent) => {
      const orderItems = await OrderItem.findAll({
        where: { orderId: parent.id }
      });
      return orderItems;
    }
  }
};

module.exports = resolvers;
