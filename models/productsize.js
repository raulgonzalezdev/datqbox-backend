'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSize.belongsTo(models.Product, {
        foreignKey: 'productId',
        field: 'productId' // Agrega esto
      });
      ProductSize.belongsTo(models.Size, {
        foreignKey: 'sizeId',
        field: 'sizeId' // Corrige esto
      });
      // Agregar aquí cualquier otra relación si es necesario
    }
  }
  ProductSize.init({
    productId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSize',
  });
  return ProductSize;
};
