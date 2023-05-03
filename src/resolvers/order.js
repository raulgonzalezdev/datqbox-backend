const { Order, OrderItem } = require('../../models');

const OrderResolvers = {
  Query: {
    orders: () => Order.findAll({ include: 'orderItems' }),
    order: (_, { id }) => Order.findByPk(id, { include: 'orderItems' }),
    orderItems: (_, { orderId }) => OrderItem.findAll({ where: { orderId } })
  },

  Mutation: {
    createOrder: async (_, { input }) => {
      const { userId, totalPrice, status } = input;
      const order = await Order.create({ userId, totalPrice, status });
      return order;
    },

    createOrderItem: async (_, { input }) => {
      const { orderId, productId, quantity, price } = input;
      const orderItem = await OrderItem.create({ orderId, productId, quantity, price });
      return orderItem;
    },

    updateOrder: async (_, { id, input }) => {
      const { userId, totalPrice, status } = input;
      const [, orders] = await Order.update({ userId, totalPrice, status }, { where: { id }, returning: true });
      return orders[0];
    },

    updateOrderItem: async (_, { id, input }) => {
      const { orderId, productId, quantity, price } = input;
      const [, orderItems] = await OrderItem.update({ orderId, productId, quantity, price }, { where: { id }, returning: true });
      return orderItems[0];
    },

    deleteOrder: async (_, { id }) => {
      const deletedRows = await Order.destroy({ where: { id } });
      return Boolean(deletedRows);
    },

    deleteOrderItem: async (_, { id }) => {
      const deletedRows = await OrderItem.destroy({ where: { id } });
      return Boolean(deletedRows);
    },
  },

  Order: {
    orderItems: (order) => order.orderItems,
  },

  OrderItem: {
    order: (orderItem) => Order.findByPk(orderItem.orderId),    
    product: (orderItem) => Product.findByPk(orderItem.productId), 
},
};

module.exports = OrderResolvers;
