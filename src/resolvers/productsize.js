const { ProductSize } = require('../../models');

const ProductSizeResolvers = {
  Query: {
    getProductSizes: async () => {
      const productSizes = await ProductSize.findAll();
      return productSizes;
    },
  },
  Mutation: {
    addProductSize: async (parent, { productSize }) => {
      const newProductSize = await ProductSize.create(productSize);
      return newProductSize;
    },
  },
};

module.exports = ProductSizeResolvers;
