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
  this.belongsToMany(models.Color, { through: models.ProductColor });
  this.belongsToMany(models.Size, { through: models.ProductSize });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    vendor: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.FLOAT,
    sku: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    inventory: DataTypes.FLOAT,
    rentalType: DataTypes.STRING,
    featured: DataTypes.BOOLEAN,
    newarrivals: DataTypes.BOOLEAN,
    taxRate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};