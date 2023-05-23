'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { 
        through: 'UserCompany', 
        foreignKey: 'companyId',
        otherKey: 'userId',
        as: 'users' 
    });
    }
  }
  Company.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    legalId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};