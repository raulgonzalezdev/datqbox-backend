const { Category, Product } = require('../../models');


const CategoryResolvers = {
  Query: {
    categories: async () => {
      return await Category.findAll({ include: [Product] });
    },
    category: async (_, { id }) => {
      if (!id) {
        throw new Error('No se proporcionó un ID de categoría.');
      }
      return await Category.findByPk(id, { include: [Product] });
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

module.exports = CategoryResolvers;

  