const client = require('../redis/redisClient');
const { Color } = require('../../models');

const ColorResolvers = {
  Query: {
    colors: async () => {
      let colors = await client.get('colors');
      if (!colors) {
        colors = await Color.findAll();
        await client.set('colors', JSON.stringify(colors));
      } else {
        colors = JSON.parse(colors);
      }
      return colors;
    },
    color: async (_, { id }) => {
      let color = await client.get(`color:${id}`);
      if (!color) {
        color = await Color.findByPk(id);
        if (!color) {
          throw new Error(`Color with ID ${id} not found`);
        }
        await client.set(`color:${id}`, JSON.stringify(color));
      } else {
        color = JSON.parse(color);
      }
      return color;
    },
  },
  Mutation: {
    createColor: async (_, { input }) => {
      const color = await Color.create(input);
      await client.del('colors');
      return color;
    },
    updateColor: async (_, { id, input }) => {
      const color = await Color.findByPk(id);
      if (!color) {
        throw new Error(`Color with ID ${id} not found`);
      }
      await color.update(input);
      await client.del('colors');
      await client.del(`color:${id}`);
      return color;
    },
    deleteColor: async (_, { id }) => {
      const color = await Color.findByPk(id);
      if (!color) {
        throw new Error(`Color with ID ${id} not found`);
      }
      await color.destroy();
      await client.del('colors');
      await client.del(`color:${id}`);
      return color;
    },
  },
};

module.exports = ColorResolvers;

