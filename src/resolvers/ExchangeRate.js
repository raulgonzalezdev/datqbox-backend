const client = require('../redis/redisClient');
const { ExchangeRate } = require('../../models');

const ExchangeRateresolvers = {
  Query: {
    getExchangeRate: async (_, { id }) => {
      let exchangeRate = await client.get(`exchangeRate:${id}`);
      if (!exchangeRate) {
        exchangeRate = await ExchangeRate.findByPk(id);
        if (!exchangeRate) {
          throw new Error(`ExchangeRate with ID ${id} not found`);
        }
        await client.set(`exchangeRate:${id}`, JSON.stringify(exchangeRate));
      } else {
        exchangeRate = JSON.parse(exchangeRate);
      }
      return exchangeRate;
    },
    getAllExchangeRates: async () => {
      let exchangeRates = await client.get('exchangeRates');
      if (!exchangeRates) {
        exchangeRates = await ExchangeRate.findAll();
        await client.set('exchangeRates', JSON.stringify(exchangeRates));
      } else {
        exchangeRates = JSON.parse(exchangeRates);
      }
      return exchangeRates;
    },
  },
  
  Mutation: {
    createExchangeRate: async (_, { input }) => {
      const exchangeRate = await ExchangeRate.create(input);
      await client.del('exchangeRates');
      return exchangeRate;
    },
    updateExchangeRate: async (_, { id, input }) => {
      await ExchangeRate.update(input, { where: { id } });
      const updatedExchangeRate = await ExchangeRate.findByPk(id);
      await client.del('exchangeRates');
      await client.del(`exchangeRate:${id}`);
      return updatedExchangeRate;
    },
    deleteExchangeRate: async (_, { id }) => {
      await ExchangeRate.destroy({ where: { id } });
      await client.del('exchangeRates');
      await client.del(`exchangeRate:${id}`);
      return true;
    },
  },
  
  ExchangeRate: {
    currencyType: async (exchangeRate) => await exchangeRate.getCurrencyType(),
  },
};

module.exports = ExchangeRateresolvers;

