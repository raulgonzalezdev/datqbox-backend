const productResolvers = {
    Query: {
      products: () => products,
      product: (_, { id }) => products.find((product) => product.id === id),
      featuredProducts: () => products.filter((product) => product.featured),
      newArrivalsProducts: () => products.filter((product) => product.newarrivals),
    },
    Product: {
      category: (product) =>
        categories.find((category) => category.id === product.categoryId),
    },
  };
  
  module.exports = productResolvers;
  