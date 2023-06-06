'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  this.belongsTo(models.Category, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.hasMany(models.Image, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.hasMany(models.Review, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.hasMany(models.OrderItem, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.hasMany(models.InvoiceItem, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.hasMany(models.ProductColor, { foreignKey: "ProductId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.hasMany(models.ProductSize, { foreignKey: "ProductId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.belongsTo(models.ExchangeRate, { foreignKey: "exchangeRateId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  this.hasOne(models.ProductCosts, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
this.hasMany(models.CompositeProductItems, { as: 'mainProducts', foreignKey: 'mainProductId' });
this.hasMany(models.CompositeProductItems, { as: 'includedProducts', foreignKey: 'includedProductId' });

    }
  }
  Product.init({
    sku: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    unit: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.FLOAT,
    profit: DataTypes.FLOAT,
    inventory: DataTypes.FLOAT,
    rentalType: DataTypes.STRING,
    featured: DataTypes.BOOLEAN,
    taxInclued: DataTypes.BOOLEAN,
    taxInclued: DataTypes.BOOLEAN,
    newarrivals: DataTypes.BOOLEAN,
    taxRate: DataTypes.FLOAT,
    exchangeRateId: DataTypes.INTEGER,
    requiresPrescription: DataTypes.BOOLEAN,
    expirationDate: DataTypes.DATE,
    dosage: DataTypes.STRING,
    usageInstructions: DataTypes.STRING,
    contraindications: DataTypes.STRING,
    activeIngredient: DataTypes.STRING,
    vendor: DataTypes.STRING,
    isComposite: DataTypes.BOOLEAN,

    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
