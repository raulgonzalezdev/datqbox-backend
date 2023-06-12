const client = require('../redis/redisClient');
const { InvoiceItem } = require('../../models');

const InvoiceItemResolvers = {
  Query: {
    invoiceItems: async () => {
      let invoiceItems = await client.get('invoiceItems');
      if (!invoiceItems) {
        invoiceItems = await InvoiceItem.findAll();
        await client.set('invoiceItems', JSON.stringify(invoiceItems));
      } else {
        invoiceItems = JSON.parse(invoiceItems);
      }
      return invoiceItems;
    },
    invoiceItem: async (parent, { id }) => {
      let invoiceItem = await client.get(`invoiceItem:${id}`);
      if (!invoiceItem) {
        invoiceItem = await InvoiceItem.findByPk(id);
        await client.set(`invoiceItem:${id}`, JSON.stringify(invoiceItem));
      } else {
        invoiceItem = JSON.parse(invoiceItem);
      }
      return invoiceItem;
    },
  },
  InvoiceItem: {
    product: async (invoiceItem) => {
      // Here we do not cache the Product because it is resolved in its own resolver
      return await invoiceItem.getProduct();
    },
  },
  Mutation: {
    createInvoiceItem: async (parent, { input }) => {
      const newInvoiceItem = await InvoiceItem.create(input);
      // Invalidate the invoiceItems cache
      await client.del('invoiceItems');
      return newInvoiceItem;
    },
    updateInvoiceItem: async (parent, { id, input }) => {
      const invoiceItem = await InvoiceItem.findByPk(id);
      if (!invoiceItem) {
        throw new Error(`Invoice item with id ${id} not found`);
      }
      await invoiceItem.update(input);
      // Invalidate the cache for this id and for all invoiceItems
      await client.del(`invoiceItem:${id}`);
      await client.del('invoiceItems');
      return invoiceItem;
    },
    deleteInvoiceItem: async (parent, { id }) => {
      const invoiceItem = await InvoiceItem.findByPk(id);
      if (!invoiceItem) {
        throw new Error(`Invoice item with id ${id} not found`);
      }
      await invoiceItem.destroy();
      // Invalidate the cache for this id and for all invoiceItems
      await client.del(`invoiceItem:${id}`);
      await client.del('invoiceItems');
      return true;
    },
  },
};

module.exports = InvoiceItemResolvers;

