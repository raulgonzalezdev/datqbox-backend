const { PaymentMethod } = require('../../models');

const PaymentMethodResolvers = {
  Query: {
    paymentMethods: async () => {
      const PaymentMethods = await PaymentMethod.findAll();
      return PaymentMethods;
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
      if (!paymentMethod) {
        throw new Error(`No se encontró el método de pago con id ${id}`);
      }
      await paymentMethod.destroy();
      return true;
    },
  },
  PaymentMethod: {
    invoices: async (paymentMethod) => {
      return await paymentMethod.getInvoices();
    },
  },
};

module.exports = PaymentMethodResolvers;

