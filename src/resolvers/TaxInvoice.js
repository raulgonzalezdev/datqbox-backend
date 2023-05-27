const { TaxInvoice, Tax, Invoice } = require('../../models');

const taxInvoiceResolvers = {
  Query: {
    getTaxInvoice: async (_, { id }) => await TaxInvoice.findByPk(id),
    getAllTaxInvoices: async () => await TaxInvoice.findAll(),
  },

  Mutation: {
    addTaxInvoice: async (_, { invoiceId, taxId, amount }) => await TaxInvoice.create({ invoiceId, taxId, amount }),
    updateTaxInvoice: async (_, { id, input }) => {
      await TaxInvoice.update(input, { where: { id } });
      return await TaxInvoice.findByPk(id);
    },
    deleteTaxInvoice: async (_, { id }) => {
      await TaxInvoice.destroy({ where: { id } });
      return id;
    },
  },

  TaxInvoice: {
    tax: async (taxInvoice) => await Tax.findByPk(taxInvoice.taxId),
    invoice: async (taxInvoice) => await Invoice.findByPk(taxInvoice.invoiceId),
  },
};

module.exports = taxInvoiceResolvers;


