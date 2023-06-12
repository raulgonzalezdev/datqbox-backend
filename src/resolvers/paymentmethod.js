const client = require('../redis/redisClient');
const { PaymentMethod } = require('../../models');

const PaymentMethodResolvers = {
  Query: {
    paymentMethods: async () => {
      let paymentMethods = await client.get('paymentMethods');
      if (!paymentMethods) {
        paymentMethods = await PaymentMethod.findAll();
        await client.set('paymentMethods', JSON.stringify(paymentMethods));
      } else {
        paymentMethods = JSON.parse(paymentMethods);
      }
      return paymentMethods;
    },
    paymentMethod: async (parent, { id }) => {
      let paymentMethod = await client.get(`paymentMethod:${id}`);
      if (!paymentMethod) {
        paymentMethod = await PaymentMethod.findByPk(id);
        await client.set(`paymentMethod:${id}`, JSON.stringify(paymentMethod));
      } else {
        paymentMethod = JSON.parse(paymentMethod);
      }
      return paymentMethod;
    }
  },
  Mutation: {
    createPaymentMethod: async (parent, { input }) => {
      const paymentMethod = await PaymentMethod.create(input);
      await client.del('paymentMethods');
      return paymentMethod;
    },
    updatePaymentMethod: async (parent, { id, input }) => {
      const paymentMethod = await PaymentMethod.findByPk(id);
      await paymentMethod.update(input);
      await client.del(`paymentMethod:${id}`);
      await client.del('paymentMethods');
      return paymentMethod;
    },
    deletePaymentMethod: async (parent, { id }) => {
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        throw new Error(`No se encontró el método de pago con id ${id}`);
      }
      await paymentMethod.destroy();
      await client.del(`paymentMethod:${id}`);
      await client.del('paymentMethods');
      return true;
    },
  },
  PaymentMethod: {
    invoices: async (paymentMethod) => {
      const invoices = await paymentMethod.getInvoices();
      await client.set(`invoices:${paymentMethod.id}`, JSON.stringify(invoices));
      return invoices;
    },
  },
};

module.exports = PaymentMethodResolvers;
