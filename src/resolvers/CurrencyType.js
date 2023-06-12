const client = require('../redis/redisClient');
const { CurrencyType } = require('../../models');

const CurrencyTypeResolvers = {
  Query: {
    getCurrencyType: async (_, { id }) => {
      let currencyType = await client.get(`currencyType:${id}`);
      if (!currencyType) {
        currencyType = await CurrencyType.findByPk(id);
        if (!currencyType) {
          throw new Error(`CurrencyType with ID ${id} not found`);
        }
        await client.set(`currencyType:${id}`, JSON.stringify(currencyType));
      } else {
        currencyType = JSON.parse(currencyType);
      }
      return currencyType;
    },
    getAllCurrencyTypes: async () => {
      let currencyTypes = await client.get('currencyTypes');
      if (!currencyTypes) {
        currencyTypes = await CurrencyType.findAll();
        await client.set('currencyTypes', JSON.stringify(currencyTypes));
      } else {
        currencyTypes = JSON.parse(currencyTypes);
      }
      return currencyTypes;
    },
  },
  Mutation: {
    createCurrencyType: async (_, { input }) => {
      const currencyType = await CurrencyType.create(input);
      await client.del('currencyTypes');
      return currencyType;
    },
    updateCurrencyType: async (_, { id, input }) => {
      await CurrencyType.update(input, { where: { id } });
      const updatedCurrencyType = await CurrencyType.findByPk(id);
      await client.del('currencyTypes');
      await client.del(`currencyType:${id}`);
      return updatedCurrencyType;
    },
    deleteCurrencyType: async (_, { id }) => {
      await CurrencyType.destroy({ where: { id } });
      await client.del('currencyTypes');
      await client.del(`currencyType:${id}`);
      return true;
    },
  },
  CurrencyType: {
    exchangeRates: async (currencyType) => await currencyType.getExchangeRates(),
  },
};

module.exports = CurrencyTypeResolvers;



