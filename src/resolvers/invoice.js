const { UserInputError } = require('apollo-server-express');
const { Invoice, User, Branch, PaymentMethod, InvoiceItem } = require('../../models');

const InvoiceResolvers = {
  Query: {
    getInvoice: async (_, { id }) => {
      const invoice = await Invoice.findByPk(id, {
        include: [User, Branch, PaymentMethod, InvoiceItem],
      });

      if (!invoice) {
        throw new UserInputError(`Invoice with id ${id} not found`);
      }

      return invoice;
    },
    getInvoices: async () => {
      const invoices = await Invoice.findAll({
        include: [User, Branch, PaymentMethod, InvoiceItem],
      });

      return invoices;
    },
  },
  Mutation: {
    createInvoice: async (_, { input }) => {
      const { userId, branchId, paymentMethodId, total, tax, status } = input;
      const user = await User.findByPk(userId);
      if (!user) {
        throw new UserInputError(`User with id ${userId} not found`);
      }
      const branch = await Branch.findByPk(branchId);
      if (!branch) {
        throw new UserInputError(`Branch with id ${branchId} not found`);
      }
      const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
      if (!paymentMethod) {
        throw new UserInputError(`Payment method with id ${paymentMethodId} not found`);
      }
      const newInvoice = await Invoice.create({ userId, branchId, paymentMethodId, total, tax, status });
      return await newInvoice.reload({
        include: [User, Branch, PaymentMethod, InvoiceItem],
      });
    },
    updateInvoice: async (_, { id, input }) => {
      const { total, tax, status } = input;
      const invoice = await Invoice.findByPk(id);
      if (!invoice) {
        throw new UserInputError(`Invoice with id ${id} not found`);
      }
      const updatedInvoice = await invoice.update({ total, tax, status });
      return await updatedInvoice.reload({
        include: [User, Branch, PaymentMethod, InvoiceItem],
      });
    },
    deleteInvoice: async (_, { id }) => {
      const invoice = await Invoice.findByPk(id);
      if (!invoice) {
        throw new UserInputError(`Invoice with id ${id} not found`);
      }
      await invoice.destroy();
      return true;
    },
  },
};

module.exports = InvoiceResolvers;
