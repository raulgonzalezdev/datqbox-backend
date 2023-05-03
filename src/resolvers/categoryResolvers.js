const categoryResolvers = {
    Query: {
      categories: () => categories,
      category: (_, { id }) => categories.find((category) => category.id === id),
    },
    Category: {
      products: (category) =>
        products.filter((product) => product.category === category.id),
    },
  };
  
  module.exports = categoryResolvers;
  