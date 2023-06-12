const client = require('../redis/redisClient');
const { UserCompany } = require('../../models');

const UserCompanyResolvers = {
  Query: {
    userCompanies: async () => {
      let userCompanies = await client.get('userCompanies');
      if (!userCompanies) {
        userCompanies = await UserCompany.findAll();
        await client.set('userCompanies', JSON.stringify(userCompanies));
      } else {
        userCompanies = JSON.parse(userCompanies);
      }
      return userCompanies;
    },
    userCompany: async (parent, { id }) => {
      let userCompany = await client.get(`userCompany:${id}`);
      if (!userCompany) {
        userCompany = await UserCompany.findByPk(id);
        await client.set(`userCompany:${id}`, JSON.stringify(userCompany));
      } else {
        userCompany = JSON.parse(userCompany);
      }
      return userCompany;
    },
  },

  Mutation: {
    createUserCompany: async (parent, { userId, companyId }) => {
      const userCompany = await UserCompany.create({
        userId,
        companyId,
      });
      await client.del('userCompanies');
      return userCompany;
    },
    deleteUserCompany: async (parent, { id }) => {
      const userCompany = await UserCompany.findByPk(id);
      if (!userCompany) {
        throw new Error('UserCompany not found');
      }
      await userCompany.destroy();
      await client.del(`userCompany:${id}`);
      await client.del('userCompanies');
      return userCompany;
    },
  },

  UserCompany: {
    user: async (userCompany) => {
      const user = await userCompany.getUser();
      await client.set(`user:${user.id}`, JSON.stringify(user));
      return user;
    },
    company: async (userCompany) => {
      const company = await userCompany.getCompany();
      await client.set(`company:${company.id}`, JSON.stringify(company));
      return company;
    },
  },
};

module.exports = UserCompanyResolvers;
