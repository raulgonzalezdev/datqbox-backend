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
  
        return newInvoicePaymentMethod;
      },
      deleteInvoicePaymentMethod: async (_, { invoiceId, paymentMethodId }) => {
        const result = await InvoicePaymentMethod.destroy({ 
          where: { invoiceId, paymentMethodId } 
        });
  
        // Si result es mayor que 0, la operación de eliminación fue exitosa
        return result > 0;
      },
    },
    InvoicePaymentMethod: {
      invoice: async (invoicePaymentMethod) => {
        return await Invoice.findByPk(invoicePaymentMethod.invoiceId);
      },
      paymentMethod: async (invoicePaymentMethod) => {
        return await PaymentMethod.findByPk(invoicePaymentMethod.paymentMethodId);
      }
    },
  };
  

module.exports = InvoicePaymentMethodResolvers;

