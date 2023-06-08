'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoicePaymentMethod extends Model {
    static associate(models) {
      // No necesita definir asociaciones en este modelo
    }
  }
  InvoicePaymentMethod.init({
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'InvoicePaymentMethod',
  });
  return InvoicePaymentMethod;
};
