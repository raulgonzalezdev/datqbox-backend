const { Tax, TaxInvoice } = require('../../models');

const taxResolvers = {
  Query: {
    getTax: async (_, { id }) => await Tax.findByPk(id),
    getAllTaxes: async () => await Tax.findAll(),
  },

  Mutation: {
    addTax: async (_, { name, rate }) => await Tax.create({ name, rate }),
    updateTax: async (_, { id, input }) => {
      await Tax.update(input, { where: { id } });
      return await Tax.findByPk(id);
    },
    deleteTax: async (_, { id }) => {
      await Tax.destroy({ where: { id } });
      return id;
    },
  },

  Tax: {
    taxInvoices: async (tax) => await TaxInvoice.findAll({ where: { taxId: tax.id } }),
  },
};

module.exports = taxResolvers;
