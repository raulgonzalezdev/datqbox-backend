const client = require('../redis/redisClient');
const { ProductSize, Size } = require('../../models');

const ProductSizeResolvers = {
  Query: {
    getProductSizes: async () => {
      let productSizes = await client.get('productSizes');
      if (!productSizes) {
        productSizes = await ProductSize.findAll();
        await client.set('productSizes', JSON.stringify(productSizes));
      } else {
        productSizes = JSON.parse(productSizes);
      }
      return productSizes;
    },
    getProductSizesByProductId: async (_, { productId }) => {
      let productSizes = await client.get(`productSizes:${productId}`);
      if (!productSizes) {
        productSizes = await ProductSize.findAll({ where: { productId } });
        await client.set(`productSizes:${productId}`, JSON.stringify(productSizes));
      } else {
        productSizes = JSON.parse(productSizes);
      }
      return productSizes;
    },
  },
  Mutation: {
    addProductSize: async (_, { productSize }) => {
      const newProductSize = await ProductSize.create(productSize);
      await client.del('productSizes');
      await client.del(`productSizes:${productSize.productId}`);
      return newProductSize;
    },
    removeProductSize: async (_, { input }) => {
      const { productId } = input;
      const deletedProductSize = await ProductSize.destroy({ 
        where: { 
          productId: productId
        } 
      });
      await client.del('productSizes');
      await client.del(`productSizes:${productId}`);
      return deletedProductSize > 0; // Returns true if a record was deleted, else false
    },
    addMultipleProductSizes: async (_, { input }) => {
      const newProductSizes = await ProductSize.bulkCreate(input);
      await client.del('productSizes');
      input.forEach(item => {
        client.del(`productSizes:${item.productId}`);
      });
      return newProductSizes;
    },
  },
  ProductSize: {
    size: async (productSize) => {
      let size = await client.get(`size:${productSize.sizeId}`);
      if (!size) {
        size = await Size.findByPk(productSize.sizeId);
        await client.set(`size:${productSize.sizeId}`, JSON.stringify(size));
      } else {
        size = JSON.parse(size);
      }
      return size;
    },
  },
};

module.exports = ProductSizeResolvers;
