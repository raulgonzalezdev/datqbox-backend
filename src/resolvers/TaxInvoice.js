const client = require('../redis/redisClient');
const { TaxInvoice, Tax, Invoice } = require('../../models');

const taxInvoiceResolvers = {
  Query: {
    getTaxInvoice: async (_, { id }) => {
      let taxInvoice = await client.get(`taxInvoice:${id}`);
      if (!taxInvoice) {
        taxInvoice = await TaxInvoice.findByPk(id);
        await client.set(`taxInvoice:${id}`, JSON.stringify(taxInvoice));
      } else {
        taxInvoice = JSON.parse(taxInvoice);
      }
      return taxInvoice;
    },
    getAllTaxInvoices: async () => {
      let taxInvoices = await client.get('taxInvoices');
      if (!taxInvoices) {
        taxInvoices = await TaxInvoice.findAll();
        await client.set('taxInvoices', JSON.stringify(taxInvoices));
      } else {
        taxInvoices = JSON.parse(taxInvoices);
      }
      return taxInvoices;
    },
  },

  Mutation: {
    addTaxInvoice: async (_, { invoiceId, taxId, amount, subtotal }) => {
      const newTaxInvoice = await TaxInvoice.create({ invoiceId, taxId, amount,subtotal });
      await client.del('taxInvoices');
      return newTaxInvoice;
    },
    updateTaxInvoice: async (_, { id, input }) => {
      await TaxInvoice.update(input, { where: { id } });
      await client.del(`taxInvoice:${id}`);
      await client.del('taxInvoices');
      return await TaxInvoice.findByPk(id);
    },
    deleteTaxInvoice: async (_, { id }) => {
      await TaxInvoice.destroy({ where: { id } });
      await client.del(`taxInvoice:${id}`);
      await client.del('taxInvoices');
      return id;
    },
  },

  TaxInvoice: {
    tax: async (taxInvoice) => {
      let tax = await client.get(`tax:${taxInvoice.taxId}`);
      if (!tax) {
        tax = await Tax.findByPk(taxInvoice.taxId);
        await client.set(`tax:${taxInvoice.taxId}`, JSON.stringify(tax));
      } else {
        tax = JSON.parse(tax);
      }
      return tax;
    },
    invoice: async (taxInvoice) => {
      let invoice = await client.get(`invoice:${taxInvoice.invoiceId}`);
      if (!invoice) {
        invoice = await Invoice.findByPk(taxInvoice.invoiceId);
        await client.set(`invoice:${taxInvoice.invoiceId}`, JSON.stringify(invoice));
      } else {
        invoice = JSON.parse(invoice);
      }
      return invoice;
    },
  },
};

module.exports = taxInvoiceResolvers;
