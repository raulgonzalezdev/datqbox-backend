const { ExchangeRate } = require('../../models');

const ExchangeRateresolvers = {
  Query: {
    getExchangeRate: async (_, { id }) => await ExchangeRate.findByPk(id),
    getAllExchangeRates: async () => await ExchangeRate.findAll(),
  },
  
  Mutation: {
    createExchangeRate: async (_, { input }) => await ExchangeRate.create(input),
    updateExchangeRate: async (_, { id, input }) => {
      await ExchangeRate.update(input, { where: { id } });
      return await ExchangeRate.findByPk(id);
    },
    deleteExchangeRate: async (_, { id }) => await ExchangeRate.destroy({ where: { id } }),
  },
  
  ExchangeRate: {
    currencyType: async (exchangeRate) => await exchangeRate.getCurrencyType(),
  },
};

module.exports = ExchangeRateresolvers;
