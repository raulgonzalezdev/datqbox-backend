const { Branch } = require('../../models');

const BranchResolvers = {
  Query: {
    branches: async () => {
      return await Branch.findAll();
    },
    branch: async (_, { id }) => {
      return await Branch.findByPk(id);
    }
  },
  Mutation: {
    createBranch: async (_, { name }) => {
      return await Branch.create({ name });
    },
    updateBranch: async (_, { id, name }) => {
      const branch = await Branch.findByPk(id);
      if (!branch) {
        throw new Error('Branch not found');
      }
      await branch.update({ name });
      return branch;
    },
    deleteBranch: async (_, { id }) => {
      const branch = await Branch.findByPk(id);
      if (!branch) {
        throw new Error('Branch not found');
      }
      await branch.destroy();
      return branch;
    }
  }
};

module.exports = BranchResolvers;

