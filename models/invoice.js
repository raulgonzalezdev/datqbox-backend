'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'user' }); 
     
      this.belongsTo(models.UserCompany, { 
        foreignKey: 'companyId', 
        otherKey: 'userId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE', 
        as: 'companies'
      });
      


      this.belongsTo(models.Branch, { foreignKey: 'branchId', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'branch' });  
      this.belongsToMany(models.PaymentMethod, { through: models.InvoicePaymentMethod, foreignKey: 'invoiceId', otherKey: 'paymentMethodId', as: 'paymentMethods' });

      this.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      this.hasMany(models.TaxInvoice, { foreignKey: 'invoiceId', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); 
      this.belongsTo(models.ExchangeRate, { foreignKey: "exchangeRateId", onDelete: "CASCADE", onUpdate: "CASCADE" });
      // this.belongsTo(models.CurrencyType, { foreignKey: "currencyId", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  Invoice.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // establece que este campo es requerido
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // establece que este campo es requerido
    },

    total: DataTypes.FLOAT,
    status: DataTypes.STRING,
    exchangeRateId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};
