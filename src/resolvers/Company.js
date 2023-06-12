const client = require('../redis/redisClient');
const { UserInputError } = require('apollo-server');
const { Company, User, UserCompany } = require('../../models');

const CompanyResolvers = {
  Query: {
    company: async (_, { id }) => {
      let company = await client.get(`company:${id}`);
      if (!company) {
        company = await Company.findByPk(id, {
          include: ['users'],
        });
        if (!company) {
          throw new UserInputError(`Company with ID ${id} not found`);
        }
        await client.set(`company:${id}`, JSON.stringify(company));
      } else {
        company = JSON.parse(company);
      }
      return company;
    },
    companies: async () => {
      let companies = await client.get('companies');
      if (!companies) {
        companies = await Company.findAll({
          include: ['users'],
        });
        await client.set('companies', JSON.stringify(companies));
      } else {
        companies = JSON.parse(companies);
      }
      return companies;
    },
  },
  Mutation: {
    addCompany: async (_, { input }) => {
      const newCompany = await Company.create(input);
      await client.del('companies');
      return newCompany;
    },
    updateCompany: async (_, { id, input }) => {
      const company = await Company.findByPk(id);
      if (!company) {
        throw new UserInputError(`Company with ID ${id} not found`);
      }
      await company.update(input);
      await client.del('companies');
      await client.del(`company:${id}`);
      return company;
    },
    deleteCompany: async (_, { id }) => {
      try {
        const company = await Company.findByPk(id);
        if (!company) {
          throw new UserInputError(`Company with ID ${id} not found`);
        }
        await company.destroy();
        await client.del('companies');
        await client.del(`company:${id}`);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  Company: {
    users: async (parent) => {
      const users = await parent.getUsers();
      return users;
    },
  },
};

module.exports = CompanyResolvers;
