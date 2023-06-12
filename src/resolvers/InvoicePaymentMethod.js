const client = require('../redis/redisClient');
const { Invoice,  PaymentMethod,  InvoicePaymentMethod } = require('../../models');


const InvoicePaymentMethodResolvers = {
  Mutation: {
    createInvoicePaymentMethod: async (_, { input }) => {
      const { invoiceId, paymentMethodId, amount } = input;

      // Crear InvoicePaymentMethod
      const newInvoicePaymentMethod = await InvoicePaymentMethod.create({
        invoiceId,
        paymentMethodId,
        amount
      });
  
      // Invalidate the cache for these ids
      await client.del(`invoice:${invoiceId}`);
      await client.del(`paymentMethod:${paymentMethodId}`);

      return newInvoicePaymentMethod;
    },
    deleteInvoicePaymentMethod: async (_, { invoiceId, paymentMethodId }) => {
      const result = await InvoicePaymentMethod.destroy({ 
        where: { invoiceId, paymentMethodId } 
      });
  
      // Si result es mayor que 0, la operación de eliminación fue exitosa
      if (result > 0) {
        // Invalidate the cache for these ids
        await client.del(`invoice:${invoiceId}`);
        await client.del(`paymentMethod:${paymentMethodId}`);
      }

      return result > 0;
    },
  },
  InvoicePaymentMethod: {
    invoice: async (invoicePaymentMethod) => {
      let invoice = await client.get(`invoice:${invoicePaymentMethod.invoiceId}`);
      if (!invoice) {
        invoice = await Invoice.findByPk(invoicePaymentMethod.invoiceId);
        await client.set(`invoice:${invoicePaymentMethod.invoiceId}`, JSON.stringify(invoice));
      } else {
        invoice = JSON.parse(invoice);
      }
      return invoice;
    },
    paymentMethod: async (invoicePaymentMethod) => {
      let paymentMethod = await client.get(`paymentMethod:${invoicePaymentMethod.paymentMethodId}`);
      if (!paymentMethod) {
        paymentMethod = await PaymentMethod.findByPk(invoicePaymentMethod.paymentMethodId);
        await client.set(`paymentMethod:${invoicePaymentMethod.paymentMethodId}`, JSON.stringify(paymentMethod));
      } else {
        paymentMethod = JSON.parse(paymentMethod);
      }
      return paymentMethod;
    }
  },
};

module.exports = InvoicePaymentMethodResolvers;
