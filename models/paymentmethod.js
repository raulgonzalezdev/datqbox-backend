'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Invoice, { through: models.InvoicePaymentMethod, foreignKey: 'paymentMethodId', otherKey: 'invoiceId', as: 'invoices' });

    }
  }
  PaymentMethod.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};