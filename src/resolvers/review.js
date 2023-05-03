// review.resolvers.js
const { UserInputError } = require('apollo-server-express');
const { Review, Product, User } = require('../../models');
const typeDefs = require('../typeDefs/review'); 
const resolvers = {
  Query: {
    getReviews: async () => {
      return await Review.findAll({
        include: ['user', 'product'],
      });
    },
  },
  Mutation: {
    createReview: async (_, { input }) => {
      const { userId, productId, rating, comment } = input;
      const user = await User.findByPk(userId);
      if (!user) {
        throw new UserInputError(`User with id ${userId} not found`);
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new UserInputError(`Product with id ${productId} not found`); 
      }
      return await Review.create({ userId, productId, rating, comment });
    },
  },
};

module.exports = { resolvers, typeDefs }; 