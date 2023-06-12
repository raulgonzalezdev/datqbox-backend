const client = require('../redis/redisClient');
const { UserInputError } = require('apollo-server');
const { Review, Product, User } = require('../../models');

const ReviewResolvers = {
  Query: {
    getReviews: async () => {
      let reviews = await client.get('reviews');
      if (!reviews) {
        reviews = await Review.findAll({
          include: ['user', 'product'],
        });
        await client.set('reviews', JSON.stringify(reviews));
      } else {
        reviews = JSON.parse(reviews);
      }
      return reviews;
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
      const newReview = await Review.create({ userId, productId, rating, comment });
      await client.del('reviews');
      return newReview;
    },
  },
};

module.exports = ReviewResolvers;
