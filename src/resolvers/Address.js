const client = require('../redis/redisClient');
const { Address } = require('../../models');

const AddressResolvers = {
  Query: {
    addresses: async () => {
      let addresses = await client.get('addresses');
      if (!addresses) {
        addresses = await Address.findAll();
        await client.set('addresses', JSON.stringify(addresses));
      } else {
        addresses = JSON.parse(addresses);
      }
      return addresses;
    },
    address: async (_, { id }) => {
      let address = await client.get(`address:${id}`);
      if (!address) {
        address = await Address.findByPk(id);
        if (!address) {
          throw new Error(`Address with ID ${id} not found`);
        }
        await client.set(`address:${id}`, JSON.stringify(address));
      } else {
        address = JSON.parse(address);
      }
      return address;
    }
  },
  Mutation: {
    createAddress: async (_, { street, city, state, zipCode, country, userId }) => {
      const address = await Address.create({ street, city, state, zipCode, country, userId });
      await client.del('addresses');
      return address;
    },
    updateAddress: async (_, { id, street, city, state, zipCode, country }) => {
      const address = await Address.findByPk(id);
      if (!address) {
        throw new Error('Address not found');
      }
      await address.update({ street, city, state, zipCode, country });
      await client.del('addresses');
      await client.del(`address:${id}`);
      return address;
    },
    deleteAddress: async (_, { id }) => {
      const address = await Address.findByPk(id);
      if (!address) {
        throw new Error('Address not found');
      }
      await address.destroy();
      await client.del('addresses');
      await client.del(`address:${id}`);
      return address;
    }
  }
};

module.exports = AddressResolvers;
