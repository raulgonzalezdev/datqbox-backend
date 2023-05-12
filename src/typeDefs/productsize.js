const { gql } = require("apollo-server");

const ProductSizeTypeDefs = gql`
  type ProductSize {
    id: ID!
    productId: ID!
    sizeId: ID!
    stock: Int!
  }

  input ProductSizeInput {
    productId: ID!
    sizeId: ID!
    stock: Int!
  }

  extend type Query {
    getProductSizes: [ProductSize!]!
    getProductSizesByProductId(productId: ID!): [ProductSize!]!
  }

  extend type Mutation {
    addProductSize(productSize: ProductSizeInput!): ProductSize!
    removeProductSize(id: ID!): Boolean!
  }
`;

module.exports = ProductSizeTypeDefs;

