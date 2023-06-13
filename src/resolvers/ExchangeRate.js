const client = require('../redis/redisClient');
const { ExchangeRate, CurrencyType } = require('../../models');

const ExchangeRateresolvers = {
  Query: {
    getExchangeRate: async (_, { id }) => {
      let exchangeRate = await client.get(`exchangeRate:${id}`);
      if (!exchangeRate) {
        exchangeRate = await ExchangeRate.findByPk(id, { include: [CurrencyType] });
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
        exchangeRates = await ExchangeRate.findAll({ include: [CurrencyType] });
        await client.set('exchangeRates', JSON.stringify(exchangeRates));
      } else {
        exchangeRates = JSON.parse(exchangeRates);
      }
      return exchangeRates;
    },
    getExchangeRateByCurrencyId: async (_, { currencyId }) => {
      let exchangeRates = await client.get(`exchangeRatesByCurrencyId:${currencyId}`);
      if (!exchangeRates) {
        exchangeRates = await ExchangeRate.findAll({
          where: {
            currencyId: currencyId
          },
          include: [CurrencyType]
        });
        await client.set(`exchangeRatesByCurrencyId:${currencyId}`, JSON.stringify(exchangeRates));
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
      const updatedExchangeRate = await ExchangeRate.findByPk(id, { include: [CurrencyType] });
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
    currencyType: async (exchangeRate) => {
      if (exchangeRate instanceof ExchangeRate) {
        return await exchangeRate.getCurrencyType();
      } else {
        // Re-obtener la instancia de la base de datos si no es una instancia de Sequelize
        const dbExchangeRate = await ExchangeRate.findByPk(exchangeRate.id);
        return dbExchangeRate ? await dbExchangeRate.getCurrencyType() : null;
      }
    },
  },
};

module.exports = ExchangeRateresolvers;
