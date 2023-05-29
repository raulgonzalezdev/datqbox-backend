'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CompositeProductItems extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'mainProductId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.belongsTo(models.Product, { foreignKey: 'includedProductId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  
  CompositeProductItems.init({
    mainProductId: DataTypes.INTEGER,
    includedProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CompositeProductItems',
  });
  
  return CompositeProductItems;
};
