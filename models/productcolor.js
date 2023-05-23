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
        foreignKey: 'ProductId',
        field: 'ProductId' // Agrega esto
      });
      
      ProductColor.belongsTo(models.Color, {
        foreignKey: 'ColorId',
        field: 'ColorId' // Y esto
      });

      // Agregar aquí cualquier otra relación si es necesario
    }
  }
  ProductColor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductId: DataTypes.INTEGER,
    ColorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductColor',
  });
  return ProductColor;
};
