const { ProductCosts, Product } = require('../../models');

const productCostsResolvers = {
    Query: {
        productCosts: async () => {
          return await ProductCosts.findAll();
        },
        productCost: async (parent, { id }) => {
          return await ProductCosts.findByPk(id);
        },
    },
    
    Mutation: {
        createProductCosts: async (parent, { input }) => {
          return await ProductCosts.create(input);
        },
        updateProductCosts: async (parent, { id, input }) => {
          const productCosts = await ProductCosts.findByPk(id);
          return await productCosts.update(input);
        },
        deleteProductCosts: async (parent, { id }) => {
          return await ProductCosts.destroy({
            where: { id }
          });
        },
    },
    
    ProductCosts: {
        product: async (productCosts) => {
          return await Product.findByPk(productCosts.productId);
        },
    },
};

module.exports = productCostsResolvers;
