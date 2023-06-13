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
    getProductSizesByProductId: async (_, { ProductId }) => {
      let productSizes = await client.get(`productSizes:${ProductId}`);
      if (!productSizes) {
        productSizes = await ProductSize.findAll({ where: { ProductId } });
        await client.set(`productSizes:${ProductId}`, JSON.stringify(productSizes));
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
      await client.del(`productSizes:${productSize.ProductId}`);
      return newProductSize;
    },
    removeProductSize: async (_, { input }) => {
      const { ProductId } = input;
      const deletedProductSize = await ProductSize.destroy({ 
        where: { 
          ProductId: ProductId
        } 
      });
      await client.del('productSizes');
      await client.del(`productSizes:${ProductId}`);
      return deletedProductSize > 0; // Returns true if a record was deleted, else false
    },
    addMultipleProductSizes: async (_, { input }) => {
      const newProductSizes = await ProductSize.bulkCreate(input);
      await client.del('productSizes');
      input.forEach(item => {
        client.del(`productSizes:${item.ProductId}`);
      });
      return newProductSizes;
    },
  },
  ProductSize: {
    size: async (productSize) => {
      let size = await client.get(`size:${productSize.SizeId}`);
      if (!size) {
        size = await Size.findByPk(productSize.SizeId);
        await client.set(`size:${productSize.SizeId}`, JSON.stringify(size));
      } else {
        size = JSON.parse(size);
      }
      return size;
    },
  },
};

module.exports = ProductSizeResolvers;

