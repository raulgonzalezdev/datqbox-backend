'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCosts extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  
  ProductCosts.init({
    purchaseCost: DataTypes.FLOAT,
    shippingCost: DataTypes.FLOAT,
    otherCosts: DataTypes.FLOAT,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProductCosts',
  });
  
  return ProductCosts;
};
