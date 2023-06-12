const client = require('../redis/redisClient');
const { CompositeProductItems, Product } = require('../../models');

const compositeProductItemsResolvers = {
    Query: {
      compositeProductItems: async () => {
        let compositeProductItems = await client.get(`compositeProductItems`);
        if (!compositeProductItems) {
          compositeProductItems = await CompositeProductItems.findAll();
          await client.set(`compositeProductItems`, JSON.stringify(compositeProductItems));
        } else {
          compositeProductItems = JSON.parse(compositeProductItems);
        }
        return compositeProductItems;
      },
      compositeProductItem: async (parent, { id }) => {
        let compositeProductItem = await client.get(`compositeProductItem:${id}`);
        if (!compositeProductItem) {
          compositeProductItem = await CompositeProductItems.findByPk(id);
          await client.set(`compositeProductItem:${id}`, JSON.stringify(compositeProductItem));
        } else {
          compositeProductItem = JSON.parse(compositeProductItem);
        }
        return compositeProductItem;
      },
      compositeProducts: async (parent, { mainProductId }) => {
        let compositeProducts = await client.get(`compositeProducts:${mainProductId}`);
        if (!compositeProducts) {
          compositeProducts = await CompositeProductItems.findAll({
            where: { mainProductId }
          });
          await client.set(`compositeProducts:${mainProductId}`, JSON.stringify(compositeProducts));
        } else {
          compositeProducts = JSON.parse(compositeProducts);
        }
        return compositeProducts;
      },
    },
    
    Mutation: {
      createCompositeProductItems: async (parent, { input }) => {
        const newCompositeProductItem = await CompositeProductItems.create(input);
        await client.del(`compositeProductItems`);
        await client.del(`compositeProducts:${newCompositeProductItem.mainProductId}`);
        return newCompositeProductItem;
      },
      updateCompositeProductItems: async (parent, { mainProductId, includedProductId, input }) => {
        const compositeProductItems = await CompositeProductItems.findOne({
          where: {
            mainProductId: mainProductId,
            includedProductId: includedProductId,
          }
        });
        if (!compositeProductItems) throw new Error("No CompositeProductItem found with provided IDs");
        await compositeProductItems.update(input);
        await client.del(`compositeProductItems`);
        await client.del(`compositeProductItem:${compositeProductItems.id}`);
        await client.del(`compositeProducts:${compositeProductItems.mainProductId}`);
        return compositeProductItems;
      },
      deleteCompositeProductItems: async (parent, { id }) => {
        const compositeProductItems = await CompositeProductItems.findByPk(id);
        if (!compositeProductItems) throw new Error("No CompositeProductItem found with provided IDs");
        await CompositeProductItems.destroy({
          where: { id }
        });
        await client.del(`compositeProductItems`);
        await client.del(`compositeProductItem:${id}`);
        await client.del(`compositeProducts:${compositeProductItems.mainProductId}`);
        return true;
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
