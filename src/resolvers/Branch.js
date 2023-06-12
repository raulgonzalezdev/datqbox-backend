const client = require('../redis/redisClient');
const { Branch } = require('../../models');

const BranchResolvers = {
  Query: {
    branches: async () => {
      let branches = await client.get('branches');
      if (!branches) {
        branches = await Branch.findAll();
        await client.set('branches', JSON.stringify(branches));
      } else {
        branches = JSON.parse(branches);
      }
      return branches;
    },
    branch: async (_, { id }) => {
      let branch = await client.get(`branch:${id}`);
      if (!branch) {
        branch = await Branch.findByPk(id);
        if (!branch) {
          throw new Error(`Branch with ID ${id} not found`);
        }
        await client.set(`branch:${id}`, JSON.stringify(branch));
      } else {
        branch = JSON.parse(branch);
      }
      return branch;
    }
  },
  Mutation: {
    createBranch: async (_, { name }) => {
      const branch = await Branch.create({ name });
      await client.del('branches');
      return branch;
    },
    updateBranch: async (_, { id, name }) => {
      const branch = await Branch.findByPk(id);
      if (!branch) {
        throw new Error('Branch not found');
      }
      await branch.update({ name });
      await client.del('branches');
      await client.del(`branch:${id}`);
      return branch;
    },
    deleteBranch: async (_, { id }) => {
      const branch = await Branch.findByPk(id);
      if (!branch) {
        throw new Error('Branch not found');
      }
      await branch.destroy();
      await client.del('branches');
      await client.del(`branch:${id}`);
      return branch;
    }
  }
};

module.exports = BranchResolvers;


