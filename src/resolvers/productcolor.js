const { ProductColor } = require('../../models');

const ProductColorResolvers = {
  Query: {
    productColors: async () => {
      const productColors = await ProductColor.findAll();
      return productColors;
    },
  },
  Mutation: {
    addProductColor: async (_, { productId, colorId }) => {
      const newProductColor = await ProductColor.create({ productId, colorId });
      return newProductColor;
    },
  },
};

module.exports = ProductColorResolvers;

