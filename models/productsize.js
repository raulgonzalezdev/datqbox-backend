'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductSize extends Model {
    static associate(models) {
      ProductSize.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        as: 'product'
      });
      ProductSize.belongsTo(models.Size, {
        foreignKey: 'SizeId',
        as: 'size'
      });
    }
  }
  ProductSize.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductId: DataTypes.INTEGER,
    SizeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSize',
  });
  return ProductSize;
};
