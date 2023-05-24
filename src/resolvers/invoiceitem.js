const { InvoiceItem } = require('../../models');

const InvoiceItemResolvers = {
  Query: {
    invoiceItems: async () => {
      const invoiceItems = await InvoiceItem.findAll();
      return invoiceItems;
    },
    invoiceItem: async (parent, { id }) => {
      const invoiceItem = await InvoiceItem.findByPk(id);
      return invoiceItem;
    },
  },
  InvoiceItem: {
    product: async (invoiceItem) => {
      return await invoiceItem.getProduct();
    },
  },
  Mutation: {
    createInvoiceItem: async (parent, { input }) => {
      const newInvoiceItem = await InvoiceItem.create(input);
      return newInvoiceItem;
    },
    updateInvoiceItem: async (parent, { id, input }) => {
      const invoiceItem = await InvoiceItem.findByPk(id);
      if (!invoiceItem) {
        throw new Error(`Invoice item with id ${id} not found`);
      }
      await invoiceItem.update(input);
      return invoiceItem;
    },
    deleteInvoiceItem: async (parent, { id }) => {
      const invoiceItem = await InvoiceItem.findByPk(id);
      if (!invoiceItem) {
        throw new Error(`Invoice item with id ${id} not found`);
      }
      await invoiceItem.destroy();
      return true;
    },
  },
};

module.exports = InvoiceItemResolvers;
