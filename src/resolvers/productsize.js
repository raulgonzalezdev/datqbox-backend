const { ProductSize } = require('../../models');

const ProductSizeResolvers = {
  Query: {
    getProductSizes: async () => {
      const productSizes = await ProductSize.findAll();
      return productSizes;
    },
    getProductSizesByProductId: async (_, { productId }) => {
      const productSizes = await ProductSize.findAll({ where: { productId } });
      return productSizes;
    },
  },
  Mutation: {
    addProductSize: async (parent, { productSize }) => {
      const newProductSize = await ProductSize.create(productSize);
      return newProductSize;
    },
    removeProductSize: async (_, { id }) => {
      const deletedProductSize = await ProductSize.destroy({ where: { id } });
      return deletedProductSize > 0; // Returns true if a record was deleted, else false
    },
  },
};

module.exports = ProductSizeResolvers;

