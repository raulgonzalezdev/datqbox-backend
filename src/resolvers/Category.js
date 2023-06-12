const client = require('../redis/redisClient');
const { Category, Product } = require('../../models');

const CategoryResolvers = {
  Query: {
    categories: async () => {
      let categories = await client.get('categories');
      if (!categories) {
        categories = await Category.findAll({ include: [Product] });
        await client.set('categories', JSON.stringify(categories));
      } else {
        categories = JSON.parse(categories);
      }
      return categories;
    },
    category: async (_, { id }) => {
      if (!id) {
        throw new Error('No se proporcionó un ID de categoría.');
      }
      let category = await client.get(`category:${id}`);
      if (!category) {
        category = await Category.findByPk(id, { include: [Product] });
        await client.set(`category:${id}`, JSON.stringify(category));
      } else {
        category = JSON.parse(category);
      }
      return category;
    },
  },

  Mutation: {
    createCategory: async (_, { input }) => {
      const newCategory = await Category.create(input);
      await client.del('categories');
      return newCategory;
    },
    updateCategory: async (_, { id, input }) => {
      await Category.update(input, { where: { id } });
      const updatedCategory = await Category.findByPk(id);
      await client.del('categories');
      await client.del(`category:${id}`);
      return updatedCategory;
    },
    deleteCategory: async (_, { id }) => {
      const deleted = await Category.destroy({ where: { id } });
      await client.del('categories');
      await client.del(`category:${id}`);
      return deleted ? true : false;
    },
  },
};

module.exports = CategoryResolvers;


  