const { ProductColor, Color } = require('../../models'); // Asegúrate de importar Color aquí

const ProductColorResolvers = {
  Query: {
    productColors: async () => {
      const productColors = await ProductColor.findAll();
      return productColors;
    },
    getProductColorsByProductId: async (_, { productId }) => {
      const productColors = await ProductColor.findAll({ where: { ProductId } });
      return productColors;
    },
  },
  Mutation: {
    addProductColor: async (_, { ProductId, ColorId }) => {
      const newProductColor = await ProductColor.create({ ProductId, ColorId });
      if (!newProductColor.ProductId) {
        throw new Error('ProductId not set on new ProductColor');
      }
      return newProductColor;
    },
    removeProductColor: async (_, { input }) => {
      const { ProductId } = input;
      const deletedProductColor = await ProductColor.destroy({ 
        where: { 
          ProductId: ProductId
          
        } 
      });
      return deletedProductColor > 0; // Returns true if a record was deleted, else false
    },
    addMultipleProductColors: async (_, { input }) => {
      const newProductColors = await ProductColor.bulkCreate(input);
      return newProductColors;
    },
    
  },
  ProductColor: {
    color: async (productColor) => {
      const color = await Color.findByPk(productColor.ColorId);
      return color;
    },
  },
};

module.exports = ProductColorResolvers;



