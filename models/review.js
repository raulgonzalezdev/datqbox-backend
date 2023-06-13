'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  this.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

  this.belongsTo(models.Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};