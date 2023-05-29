const { CompositeProductItems, Product } = require('../../models');

const compositeProductItemsResolvers = {
    Query: {
        compositeProductItems: async () => {
          return await CompositeProductItems.findAll();
        },
        compositeProductItem: async (parent, { id }) => {
          return await CompositeProductItems.findByPk(id);
        },
    },
    
    Mutation: {
        createCompositeProductItems: async (parent, { input }) => {
          return await CompositeProductItems.create(input);
        },
        updateCompositeProductItems: async (parent, { id, input }) => {
          const compositeProductItems = await CompositeProductItems.findByPk(id);
          return await compositeProductItems.update(input);
        },
        deleteCompositeProductItems: async (parent, { id }) => {
          return await CompositeProductItems.destroy({
            where: { id }
          });
        },
    },
    
    CompositeProductItems: {
        mainProduct: async (compositeProductItems) => {
          return await Product.findByPk(compositeProductItems.mainProductId);
        },
        includedProduct: async (compositeProductItems) => {
          return await Product.findByPk(compositeProductItems.includedProductId);
        },
    },
};

module.exports = compositeProductItemsResolvers;
