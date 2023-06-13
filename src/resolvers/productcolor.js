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
        getProductColorsByProductId: async (_, { ProductId }) => {
            let productColors = await client.get(`productColors:${ProductId}`);
            if (!productColors) {
                productColors = await ProductColor.findAll({ where: { ProductId } });
                await client.set(`productColors:${ProductId}`, JSON.stringify(productColors));
            } else {
                productColors = JSON.parse(productColors);
            }
            return productColors;
        },
    },
    Mutation: {
        addProductColor: async (_, { ProductId, ColorId }) => {
            const newProductColor = await ProductColor.create({ ProductId, ColorId });
            if (!newProductColor.ProductId) {
                throw new Error('ProductId not set on new ProductColor');
            }
            await client.del('productColors');
            await client.del(`productColors:${ProductId}`);
            return newProductColor;
        },
        removeProductColor: async (_, { input }) => {
            const { ProductId } = input;
            const deletedProductColor = await ProductColor.destroy({ 
                where: { 
                    ProductId: ProductId
                } 
            });
            await client.del('productColors');
            await client.del(`productColors:${ProductId}`);
            return deletedProductColor > 0; // Returns true if a record was deleted, else false
        },
        addMultipleProductColors: async (_, { input }) => {
            const newProductColors = await ProductColor.bulkCreate(input);
            await client.del('productColors');
            input.forEach(productColor => {
                client.del(`productColors:${productColor.ProductId}`);
            });
            return newProductColors;
        },
    },
    ProductColor: {
      color: async (productColor) => {
          let color = await client.get(`color:${productColor.ColorId}`);
          if (!color) {
              color = await Color.findByPk(productColor.ColorId);
              if (color) {
                  await client.set(`color:${productColor.ColorId}`, JSON.stringify(color));
              }
          } else {
              color = JSON.parse(color);
          }
          return color;
      },
  }
  
};

module.exports = ProductColorResolvers;

