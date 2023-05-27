'use strict';
const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Tax extends Model {
      static associate(models) {
        this.hasMany(models.TaxInvoice, { foreignKey: 'taxId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      }
    }
    Tax.init({
      name: DataTypes.STRING,
      rate: DataTypes.FLOAT,
    }, {
      sequelize,
      modelName: 'Tax',
    });
    return Tax;
  };
  