const { UserInputError } = require('apollo-server');
const { Size, Product } = require('../../models');

const SizeResolvers = {
  Query: {
    size: async (_, { id }) => {
      const size = await Size.findByPk(id, { include: [Product] });
      if (!size) {
        throw new UserInputError(`Size with id ${id} not found.`);
      }
      return size;
    },
    sizes: async () => {
      const sizes = await Size.findAll({ include: [Product] });
      return sizes;
    },
  },
  Mutation: {
    createSize: async (_, { name }) => {
      const size = await Size.create({ name });
      return size;
    },
    updateSize: async (_, { id, name }) => {
      const size = await Size.findByPk(id);
      if (!size) {
        throw new UserInputError(`Size with id ${id} not found.`);
      }
      await size.update({ name });
      return size;
    },
    deleteSize: async (_, { id }) => {
      const size = await Size.findByPk(id);
      if (!size) {
        throw new UserInputError(`Size with id ${id} not found.`);
      }
      await size.destroy();
      return size; 
  },
}
};

module.exports = SizeResolvers;
