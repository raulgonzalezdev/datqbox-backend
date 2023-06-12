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
        productCost: async (parent, { id }) => {
            let productCost = await client.get(`productCost:${id}`);
            if (!productCost) {
                productCost = await ProductCosts.findByPk(id);
                await client.set(`productCost:${id}`, JSON.stringify(productCost));
            } else {
                productCost = JSON.parse(productCost);
            }
            return productCost;
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

