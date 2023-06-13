const client = require('../redis/redisClient');
const { ProductCosts, Product } = require('../../models');

const productCostsResolvers = {
    Query: {
        productCosts: async () => {
            let productCosts = await client.get('productCosts');
            if (!productCosts) {
                productCosts = await ProductCosts.findAll();
                await client.set('productCosts', JSON.stringify(productCosts));
            } else {
                productCosts = JSON.parse(productCosts);
            }
            return productCosts;
        },
        productCost: async (parent, { productId }) => {
            // let productCost = await client.get(`productCost:${id}`);
            // if (!productCost) {
            //     productCost = await ProductCosts.findByPk(id);
            let productCosts = await client.get(`productCosts:${productId}`);
            if (!productCosts) {
              productCosts = await ProductCosts.findAll({ where: { productId: productId } });
                await client.set(`productCosts:${productId}`, JSON.stringify(productCosts));
            } else {
                productCosts = JSON.parse(productCosts);
            }
            return productCosts;
        },
        productCostByProduct: async (parent, { productId }) => {
            let productCosts = await client.get(`productCosts:${productId}`);
            if (!productCosts) {
              productCosts = await ProductCosts.findAll({ where: { productId: productId } });
              await client.set(`productCosts:${productId}`, JSON.stringify(productCosts));
            } else {
              productCosts = JSON.parse(productCosts);
            }
            return productCosts;
          },
    },

    Mutation: {
        createProductCosts: async (parent, { input }) => {
            const newProductCosts = await ProductCosts.create(input);
            await client.del('productCosts');
            return newProductCosts;
        },
        updateProductCosts: async (parent, { id, input }) => {
            const productCosts = await ProductCosts.findByPk(id);
            const updatedProductCosts = await productCosts.update(input);
            await client.del('productCosts');
            await client.del(`productCost:${id}`);
            return updatedProductCosts;
        },
        deleteProductCosts: async (parent, { id }) => {
            const deleted = await ProductCosts.destroy({ where: { id } });
            await client.del('productCosts');
            await client.del(`productCost:${id}`);
            return deleted;
        },
    },

    ProductCosts: {
        product: async (productCosts) => {
            return await Product.findByPk(productCosts.productId);
        },
    },
};

module.exports = productCostsResolvers;


// const client = require('../redis/redisClient');
// const { ProductCosts, Product } = require('../../models');

// const productCostsResolvers = {
//     Query: {

  
//         productCosts: async () => {
//           return await ProductCosts.findAll();
//         },
//         productCost: async (parent, { id }) => {
//           return await ProductCosts.findByPk(id);
//         },
//     },
    
//     Mutation: {
//         createProductCosts: async (parent, { input }) => {
//           return await ProductCosts.create(input);
//         },
//         updateProductCosts: async (parent, { id, input }) => {
//           const productCosts = await ProductCosts.findByPk(id);
//           return await productCosts.update(input);
//         },
//         deleteProductCosts: async (parent, { id }) => {
//           return await ProductCosts.destroy({
//             where: { id }
//           });
//         },
//     },
    
//     ProductCosts: {
//         product: async (productCosts) => {
//           return await Product.findByPk(productCosts.productId);
//         },
//     },
// };

// module.exports = productCostsResolvers;