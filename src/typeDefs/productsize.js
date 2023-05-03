const { gql } = require("apollo-server");

const typeDefs = gql`

type ProductSize {
  id: ID!
  productId: ID!
  size: String!
  stock: Int!
}

input ProductSizeInput {
  productId: ID!
  size: String!
  stock: Int!
}

extend type Query {
  getProductSizes: [ProductSize!]!
}

extend type Mutation {
  addProductSize(productSize: ProductSizeInput!): ProductSize!
}
`;

module.exports = typeDefs;
