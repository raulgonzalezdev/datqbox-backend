const { Category } = require('../../models');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.findAll({ include: 'products' });
    },
    category: async (_, { id }) => {
      return await Category.findByPk(id, { include: 'products' });
    },
  },
  Mutation: {
    createCategory: async (_, { input }) => {
      const newCategory = await Category.create(input);
      return newCategory;
    },
    updateCategory: async (_, { id, input }) => {
      await Category.update(input, { where: { id } });
      const updatedCategory = await Category.findByPk(id);
      return updatedCategory;
    },
    deleteCategory: async (_, { id }) => {
      const deleted = await Category.destroy({ where: { id } });
      return deleted ? true : false;
    },
  },
};

module.exports = resolvers;

  