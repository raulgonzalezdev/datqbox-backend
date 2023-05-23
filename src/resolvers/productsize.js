const { ProductSize, Size } = require('../../models'); // Asegúrate de importar Size aquí

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
    removeProductSize: async (_, { input }) => {
      const { ProductId } = input;
      const deletedProductSize = await ProductSize.destroy({ 
        where: { 
          ProductId: ProductId
          
        } 
      });
      return deletedProductSize > 0; // Returns true if a record was deleted, else false
    },
    addMultipleProductSizes: async (_, { input }) => {
      const newProductSizes = await ProductSize.bulkCreate(input);
      return newProductSizes;
    },
    
    
  },
  ProductSize: {
    size: async (productSize) => {
      const size = await Size.findByPk(productSize.SizeId);
      return size;
    },
  },
};

module.exports = ProductSizeResolvers;


