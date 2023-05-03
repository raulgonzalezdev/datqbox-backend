const { UserInputError } = require('apollo-server-express');
const { Image, Product } = require('../../models');

const resolvers = {
  Query: {
    images: async () => {
      return await Image.findAll({
        include: [{ model: Product }]
      });
    },
    image: async (_, { id }) => {
      return await Image.findByPk(id, {
        include: [{ model: Product }]
      });
    }
  },
  Mutation: {
    addImage: async (_, { input }) => {
      const { url, productId } = input;
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new UserInputError(`Product with id ${productId} not found`);
      }
      const newImage = await Image.create({ url, productId });
      return await Image.findByPk(newImage.id, {
        include: [{ model: Product }]
      });
    }
  }
};

module.exports = resolvers;
