const client = require('../redis/redisClient');
const { Order, OrderItem } = require('../../models');

const OrderResolvers = {
  Query: {
    orders: async () => {
      let orders = await client.get('orders');
      if (!orders) {
        orders = await Order.findAll({ include: 'orderItems' });
        await client.set('orders', JSON.stringify(orders));
      } else {
        orders = JSON.parse(orders);
      }
      return orders;
    },
    order: async (_, { id }) => {
      let order = await client.get(`order:${id}`);
      if (!order) {
        order = await Order.findByPk(id, { include: 'orderItems' });
        await client.set(`order:${id}`, JSON.stringify(order));
      } else {
        order = JSON.parse(order);
      }
      return order;
    },
    orderItems: async (_, { orderId }) => {
      let orderItems = await client.get(`orderItems:${orderId}`);
      if (!orderItems) {
        orderItems = await OrderItem.findAll({ where: { orderId } });
        await client.set(`orderItems:${orderId}`, JSON.stringify(orderItems));
      } else {
        orderItems = JSON.parse(orderItems);
      }
      return orderItems;
    }
  },
  Mutation: {
    createOrder: async (_, { input }) => {
      const { userId, totalPrice, status } = input;
      const order = await Order.create({ userId, totalPrice, status });
      await client.del('orders');
      return order;
    },
    createOrderItem: async (_, { input }) => {
      const { orderId, productId, quantity, price } = input;
      const orderItem = await OrderItem.create({ orderId, productId, quantity, price });
      await client.del(`orderItems:${orderId}`);
      return orderItem;
    },
    updateOrder: async (_, { id, input }) => {
      const { userId, totalPrice, status } = input;
      const [, orders] = await Order.update({ userId, totalPrice, status }, { where: { id }, returning: true });
      const updatedOrder = orders[0];
      await client.del(`order:${id}`);
      await client.del('orders');
      return updatedOrder;
    },
    updateOrderItem: async (_, { id, input }) => {
      const { orderId, productId, quantity, price } = input;
      const [, orderItems] = await OrderItem.update({ orderId, productId, quantity, price }, { where: { id }, returning: true });
      const updatedOrderItem = orderItems[0];
      await client.del(`orderItems:${orderId}`);
      return updatedOrderItem;
    },
    deleteOrder: async (_, { id }) => {
      const deletedRows = await Order.destroy({ where: { id } });
      await client.del(`order:${id}`);
      await client.del('orders');
      return Boolean(deletedRows);
    },
    deleteOrderItem: async (_, { id }) => {
      const orderItem = await OrderItem.findByPk(id);
      const deletedRows = await OrderItem.destroy({ where: { id } });
      if (deletedRows) await client.del(`orderItems:${orderItem.orderId}`);
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
