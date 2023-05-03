'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  this.belongsTo(models.Branch, { foreignKey: 'branchId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  this.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  this.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  Invoice.init({
    userId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER,
    paymentMethodId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};