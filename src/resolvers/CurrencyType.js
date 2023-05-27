const { CurrencyType } = require('../../models');

const CurrencyTypeResolvers = {
  Query: {
    getCurrencyType: async (_, { id }) => await CurrencyType.findByPk(id),
    getAllCurrencyTypes: async () => await CurrencyType.findAll(),
  },
  
  Mutation: {
    createCurrencyType: async (_, { input }) => await CurrencyType.create(input),
    updateCurrencyType: async (_, { id, input }) => {
      await CurrencyType.update(input, { where: { id } });
      return await CurrencyType.findByPk(id);
    },
    deleteCurrencyType: async (_, { id }) => await CurrencyType.destroy({ where: { id } }),
  },
  
  CurrencyType: {
    exchangeRates: async (currencyType) => await currencyType.getExchangeRates(),
  },
};

module.exports = CurrencyTypeResolvers;

