const { UserInputError } = require('apollo-server');
const client = require('../redis/redisClient');
const { Size, Product } = require('../../models');

const SizeResolvers = {
  Query: {
    size: async (_, { id }) => {
      let size = await client.get(`size:${id}`);
      if (!size) {
        size = await Size.findByPk(id, { include: [Product] });
        if (!size) {
          throw new UserInputError(`Size with id ${id} not found.`);
        }
        await client.set(`size:${id}`, JSON.stringify(size));
      } else {
        size = JSON.parse(size);
      }
      return size;
    },
    sizes: async () => {
      let sizes = await client.get('sizes');
      if (!sizes) {
        sizes = await Size.findAll({ include: [Product] });
        await client.set('sizes', JSON.stringify(sizes));
      } else {
        sizes = JSON.parse(sizes);
      }
      return sizes;
    },
  },
  Mutation: {
    createSize: async (_, { name }) => {
      const size = await Size.create({ name });
      await client.del('sizes');
      return size;
    },
    updateSize: async (_, { id, name }) => {
      const size = await Size.findByPk(id);
      if (!size) {
        throw new UserInputError(`Size with id ${id} not found.`);
      }
      await size.update({ name });
      await client.del('sizes');
      await client.del(`size:${id}`);
      return size;
    },
    deleteSize: async (_, { id }) => {
      const size = await Size.findByPk(id);
      if (!size) {
        throw new UserInputError(`Size with id ${id} not found.`);
      }
      await size.destroy();
      await client.del('sizes');
      await client.del(`size:${id}`);
      return true;
    },
  },
};

module.exports = SizeResolvers;
