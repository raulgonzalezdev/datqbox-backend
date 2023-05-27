'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExchangeRate extends Model {
    static associate(models) {
      this.belongsTo(models.CurrencyType, { foreignKey: 'currencyId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  ExchangeRate.init({
    currencyId: DataTypes.INTEGER,
    rate: DataTypes.FLOAT,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'ExchangeRate',
  });
  return ExchangeRate;
};
