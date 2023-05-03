const PaymentMethod = require('../../models').PaymentMethod;

const resolvers = {
  Query: {
    paymentMethods: async () => {
      return await PaymentMethod.findAll();
    },
    paymentMethod: async (parent, { id }) => {
      return await PaymentMethod.findByPk(id);
    }
  },
  Mutation: {
    createPaymentMethod: async (parent, { input }) => {
      const paymentMethod = await PaymentMethod.create(input);
      return paymentMethod;
    },
    updatePaymentMethod: async (parent, { id, input }) => {
      const paymentMethod = await PaymentMethod.findByPk(id);
      await paymentMethod.update(input);
      return paymentMethod;
    },
    deletePaymentMethod: async (parent, { id }) => {
      const paymentMethod = await PaymentMethod.findByPk(id);
      await paymentMethod.destroy();
      return paymentMethod;
    }
  }
};

module.exports = resolvers;
