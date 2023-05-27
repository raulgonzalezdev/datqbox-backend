'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrencyType extends Model {
    static associate(models) {
      this.hasMany(models.ExchangeRate, { foreignKey: 'currencyId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.hasMany(models.Product, { foreignKey: 'currencyId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.hasMany(models.Invoice, { foreignKey: 'currencyId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  CurrencyType.init({
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CurrencyType',
  });
  return CurrencyType;
};
