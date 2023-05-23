const { UserInputError } = require('apollo-server');
const { Company, User, UserCompany } = require('../../models');

const CompanyResolvers = {
  Query: {
    company: async (_, { id }) => {
      return await Company.findByPk(id, {
        include: ['users'],
      });
    },
    companies: async () => {
      return await Company.findAll({
        include: ['users'],
      });
    },
  },
  Mutation: {
    addCompany: async (_, { input }) => {
      const newCompany = await Company.create(input);
      return newCompany;
    },
    updateCompany: async (_, { id, input }) => {
      const company = await Company.findByPk(id);
      if (!company) {
        throw new UserInputError(`Company with id ${id} not found`);
      }
      await company.update(input);
      return company;
    },
    deleteCompany: async (_, { id }) => {
      try {
        const company = await Company.findByPk(id);
        if (!company) {
          throw new UserInputError(`Company with id ${id} not found`);
        }
        await company.destroy();
        return true; // Devuelve `true` si la compañía se eliminó correctamente.
      } catch (error) {
        console.error(error);
        return false; // Devuelve `false` si ocurrió un error.
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
