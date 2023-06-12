const client = require('../redis/redisClient');
const { ProductColor, Color } = require('../../models');

const ProductColorResolvers = {
  Query: {
    productColors: async () => {
      let productColors = await client.get('productColors');
      if (!productColors) {
        productColors = await ProductColor.findAll();
        await client.set('productColors', JSON.stringify(productColors));
      } else {
        productColors = JSON.parse(productColors);
      }
      return productColors;
    },
    getProductColorsByProductId: async (_, { productId }) => {
      let productColors = await client.get(`productColors:${productId}`);
      if (!productColors) {
        productColors = await ProductColor.findAll({ where: { productId } });
        await client.set(`productColors:${productId}`, JSON.stringify(productColors));
      } else {
        productColors = JSON.parse(productColors);
      }
      return productColors;
    },
  },
  Mutation: {
    addProductColor: async (_, { productId, colorId }) => {
      const newProductColor = await ProductColor.create({ productId, colorId });
      if (!newProductColor.productId) {
        throw new Error('ProductId not set on new ProductColor');
      }
      await client.del('productColors');
      await client.del(`productColors:${productId}`);
      return newProductColor;
    },
    removeProductColor: async (_, { input }) => {
      const { productId } = input;
      const deletedProductColor = await ProductColor.destroy({ 
        where: { 
          productId: productId
        } 
      });
      await client.del('productColors');
      await client.del(`productColors:${productId}`);
      return deletedProductColor > 0; // Returns true if a record was deleted, else false
    },
    addMultipleProductColors: async (_, { input }) => {
      const newProductColors = await ProductColor.bulkCreate(input);
      await client.del('productColors');
      input.forEach(item => {
        client.del(`productColors:${item.productId}`);
      });
      return newProductColors;
    },
  },
  ProductColor: {
    color: async (productColor) => {
      let color = await client.get(`color:${productColor.colorId}`);
      if (!color) {
        color = await Color.findByPk(productColor.colorId);
        await client.set(`color:${productColor.colorId}`, JSON.stringify(color));
      } else {
        color = JSON.parse(color);
      }
      return color;
    },
  },
};

module.exports = ProductColorResolvers;
