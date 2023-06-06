const { CompositeProductItems, Product } = require('../../models');

const compositeProductItemsResolvers = {
    Query: {
      compositeProductItems: async () => {
        return await CompositeProductItems.findAll();
      },
      compositeProductItem: async (parent, { id }) => {
        return await CompositeProductItems.findByPk(id);
      },
      compositeProducts: async (parent, { mainProductId }) => {
        return await CompositeProductItems.findAll({
          where: { mainProductId }
        });
      },
    },
    
    Mutation: {
      createCompositeProductItems: async (parent, { input }) => {
        return await CompositeProductItems.create(input);
      },
      updateCompositeProductItems: async (parent, { mainProductId, includedProductId, input }) => {
        const compositeProductItems = await CompositeProductItems.findOne({
          where: {
            mainProductId: mainProductId,
            includedProductId: includedProductId,
          }
        });
        if (!compositeProductItems) throw new Error("No CompositeProductItem found with provided IDs");
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
