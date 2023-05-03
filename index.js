const { ApolloServer, gql } = require("apollo-server");
const productResolvers = require("./src/resolvers/productResolvers");
const categoryResolvers = require("./src/resolvers/categoryResolvers");
const productTypeDefs = require("./src/typeDefs/productTypeDefs");
const categoryTypeDefs = require("./src/typeDefs/categoryTypeDefs");

const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
    featuredProducts: [Product!]!
    newArrivalsProducts: [Product!]!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  ${productTypeDefs}
  ${categoryTypeDefs}
`;

const resolvers = {
  Query: {
    ...productResolvers.Query,
    ...categoryResolvers.Query,
  },
  Product: {
    ...productResolvers.Product,
  },
  Category: {
    ...categoryResolvers.Category,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
