const client = require('../redis/redisClient');
const { Tax, TaxInvoice } = require('../../models');

const taxResolvers = {
  Query: {
    getTax: async (_, { id }) => {
      let tax = await client.get(`tax:${id}`);
      if (!tax) {
        tax = await Tax.findByPk(id);
        await client.set(`tax:${id}`, JSON.stringify(tax));
      } else {
        tax = JSON.parse(tax);
      }
      return tax;
    },
    getAllTaxes: async () => {
      let taxes = await client.get('taxes');
      if (!taxes) {
        taxes = await Tax.findAll();
        await client.set('taxes', JSON.stringify(taxes));
      } else {
        taxes = JSON.parse(taxes);
      }
      return taxes;
    },
  },

  Mutation: {
    addTax: async (_, { name, rate }) => {
      const newTax = await Tax.create({ name, rate });
      await client.del('taxes');
      return newTax;
    },
    updateTax: async (_, { id, input }) => {
      await Tax.update(input, { where: { id } });
      await client.del(`tax:${id}`);
      await client.del('taxes');
      return await Tax.findByPk(id);
    },
    deleteTax: async (_, { id }) => {
      await Tax.destroy({ where: { id } });
      await client.del(`tax:${id}`);
      await client.del('taxes');
      return id;
    },
  },

  Tax: {
    taxInvoices: async (tax) => {
      let taxInvoices = await client.get(`taxInvoices:${tax.id}`);
      if (!taxInvoices) {
        taxInvoices = await TaxInvoice.findAll({ where: { taxId: tax.id } });
        await client.set(`taxInvoices:${tax.id}`, JSON.stringify(taxInvoices));
      } else {
        taxInvoices = JSON.parse(taxInvoices);
      }
      return taxInvoices;
    },
  },
};

module.exports = taxResolvers;

