const { gql } = require("apollo-server");

const typeDefs = gql`
  type ProductColor {
    id: ID!
    productId: ID!
    colorId: ID!
  }

  extend type Query {
    productColors: [ProductColor!]!
  }

  extend type Mutation {
    addProductColor(productId: ID!, colorId: ID!): ProductColor!
  }
`;

module.exports = typeDefs;

  