const { Address } = require('../../models');

const resolvers = {
  Query: {
    addresses: async () => {
      return await Address.findAll();
    },
    address: async (_, { id }) => {
      return await Address.findByPk(id);
    }
  },
  Mutation: {
    createAddress: async (_, { street, city, state, zipCode, country, userId }) => {
      return await Address.create({ street, city, state, zipCode, country, userId });
    },
    updateAddress: async (_, { id, street, city, state, zipCode, country }) => {
      const address = await Address.findByPk(id);
      if (!address) {
        throw new Error('Address not found');
      }
      await address.update({ street, city, state, zipCode, country });
      return address;
    },
    deleteAddress: async (_, { id }) => {
      const address = await Address.findByPk(id);
      if (!address) {
        throw new Error('Address not found');
      }
      await address.destroy();
      return address;
    }
  }
};

module.exports = resolvers;
