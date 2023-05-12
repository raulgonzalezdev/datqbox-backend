'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductColor.belongsTo(models.Product, {
        foreignKey: 'productId',
        field: 'productId' // Agrega esto
      });
      
      ProductColor.belongsTo(models.Color, {
        foreignKey: 'colorId',
        field: 'colorId' // Y esto
      });

      // Agregar aquí cualquier otra relación si es necesario
    }
  }
  ProductColor.init({
    productId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductColor',
  });
  return ProductColor;
};
