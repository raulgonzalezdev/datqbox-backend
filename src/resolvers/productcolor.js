const { ProductColor } = require('../../models');

const ProductColorResolvers = {
  Query: {
    productColors: async () => {
      const productColors = await ProductColor.findAll();
      return productColors;
    },
    getProductColorsByProductId: async (_, { productId }) => {
      const productColors = await ProductColor.findAll({ where: { productId } });
      return productColors;
    },
  },
  Mutation: {
    addProductColor: async (_, { productId, colorId }) => {
      const newProductColor = await ProductColor.create({ productId, colorId });
      return newProductColor;
    },
    removeProductColor: async (_, { id }) => {
      const deletedProductColor = await ProductColor.destroy({ where: { id } });
      return deletedProductColor > 0; // Returns true if a record was deleted, else false
    },
  },
};

module.exports = ProductColorResolvers;


