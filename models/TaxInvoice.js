'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxInvoice extends Model {
    static associate(models) {
      this.belongsTo(models.Invoice, { foreignKey: 'invoiceId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.belongsTo(models.Tax, { foreignKey: 'taxId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  TaxInvoice.init({
    invoiceId: DataTypes.INTEGER,
    taxId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'TaxInvoice',
  });
  return TaxInvoice;
};
