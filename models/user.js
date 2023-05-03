'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
this.hasMany(models.Address, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  this.hasMany(models.Cart, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  this.hasMany(models.Order, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  this.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  this.belongsToMany(models.Company, { through: models.UserCompany });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.STRING,
    is_superuser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
      },
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};