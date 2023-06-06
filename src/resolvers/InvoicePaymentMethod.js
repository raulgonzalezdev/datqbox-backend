const { Invoice, User, Company, Branch, PaymentMethod, InvoiceItem, TaxInvoice, ExchangeRate, InvoicePaymentMethod } = require('../../models');

const InvoicePaymentMethodResolvers = {
  Query: {
    getInvoice: async (parent, { id }) => {
      return await Invoice.findByPk(id);
    },
    getAllInvoices: async () => {
      return await Invoice.findAll();
    }
  },
  Mutation: {
    createInvoice: async (parent, { input }) => {
      const newInvoice = await Invoice.create(input);

      if (input.paymentMethodIds) {
        for (let i = 0; i < input.paymentMethodIds.length; i++) {
          await InvoicePaymentMethod.create({ invoiceId: newInvoice.id, paymentMethodId: input.paymentMethodIds[i] });
        }
      }

      return newInvoice;
    },
    updateInvoice: async (parent, { id, input }) => {
      const invoice = await Invoice.findByPk(id);
      await invoice.update(input);

      // Update the associated payment methods
      if (input.paymentMethodIds) {
        // Delete the old associations
        await InvoicePaymentMethod.destroy({ where: { invoiceId: id } });
        // Create the new associations
        for (let i = 0; i < input.paymentMethodIds.length; i++) {
          await InvoicePaymentMethod.create({ invoiceId: id, paymentMethodId: input.paymentMethodIds[i] });
        }
      }

      return invoice;
    },
    async deleteInvoice(_, { id }) {
      const invoice = await Invoice.findByPk(id);
      if (!invoice) {
        throw new Error(`No se encontró la factura con id ${id}`);
      }
    
      // Get the associated payment methods
      const paymentMethods = await invoice.getPaymentMethods();
    
      // Remove the associations
      for (let i = 0; i < paymentMethods.length; i++) {
        await invoice.removePaymentMethod(paymentMethods[i]);
      }
    
      // Now it's safe to delete the invoice
      await invoice.destroy();
    
      return true;
    },
  },
  Invoice: {
    user: (invoice) => User.findByPk(invoice.userId),
    companies: (invoice) => Company.findAll({ where: { id: invoice.companyId } }),
    branch: (invoice) => Branch.findByPk(invoice.branchId),
    paymentMethods: (invoice) => InvoicePaymentMethod.findAll({ where: { invoiceId: invoice.id } }),
    invoiceItems: (invoice) => InvoiceItem.findAll({ where: { invoiceId: invoice.id } }),
    taxInvoices: (invoice) => TaxInvoice.findAll({ where: { invoiceId: invoice.id } }),
    exchangeRate: (invoice) => ExchangeRate.findByPk(invoice.exchangeRateId),
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

