const { Color } = require('../../models');

const ColorResolvers = {
  Query: {
    colors: async () => {
      const colors = await Color.findAll();
      return colors;
    },
    color: async (_, { id }) => {
      const color = await Color.findByPk(id);
      return color;
    },
  },
  Mutation: {
    createColor: async (_, { input }) => {
      const color = await Color.create(input);
      return color;
    },
    updateColor: async (_, { id, input }) => {
      const color = await Color.findByPk(id);
      if (!color) {
        throw new Error(`Color with ID ${id} not found`);
      }
      await color.update(input);
      return color;
    },
    deleteColor: async (_, { id }) => {
      const color = await Color.findByPk(id);
      if (!color) {
        throw new Error(`Color with ID ${id} not found`);
      }
      await color.destroy();
      return color;
    },
  },
};

module.exports = ColorResolvers;
