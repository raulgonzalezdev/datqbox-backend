const { UserCompany } = require('../../models');

const UserCompanyResolvers = {
  Query: {
    userCompanies: async () => {
      const userCompanies = await UserCompany.findAll();
      return userCompanies;
    },
    userCompany: async (parent, { id }) => {
      const userCompany = await UserCompany.findByPk(id);
      return userCompany;
    },
  },

  Mutation: {
    createUserCompany: async (parent, { userId, companyId }) => {
      const userCompany = await UserCompany.create({
        userId,
        companyId,
      });
      return userCompany;
    },
    deleteUserCompany: async (parent, { id }) => {
      const userCompany = await UserCompany.findByPk(id);
      if (!userCompany) {
        throw new Error('UserCompany not found');
      }
      await userCompany.destroy();
      return userCompany;
    },
  },

  UserCompany: {
    user: async (userCompany) => {
      const user = await userCompany.getUser();
      return user;
    },
    company: async (userCompany) => {
      const company = await userCompany.getCompany();
      return company;
    },
  },
};

module.exports = UserCompanyResolvers;
