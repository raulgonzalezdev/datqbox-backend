'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { 
          foreignKey: 'userId', 
          as: 'user' 
      });
      this.belongsTo(models.Company, { 
          foreignKey: 'companyId', 
          as: 'companys' 
      });
      this.hasMany(models.Invoice, { 
        foreignKey: 'userCompanyId', 
        otherKey: 'userId'
      });
      


  }
  }
  UserCompany.init({
    userId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCompany',
  });
  return UserCompany;

};