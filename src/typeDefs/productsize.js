const { gql } = require("apollo-server");

const ProductSizeTypeDefs = gql`
type ProductSize {
  id: ID!
  ProductId: ID!
  SizeId: ID!
  stock: Int
  size: Size!
}

  input ProductSizeInput {
    ProductId: ID!
    SizeId: ID!
    stock: Int
  }
  input RemoveProductSizeInput {
    ProductId: ID!
 
  }

  extend type Query {
    getProductSizes: [ProductSize!]!
    getProductSizesByProductId(ProductId: ID!): [ProductSize!]!
  }

  extend type Mutation {
    addProductSize(productSize: ProductSizeInput!): ProductSize!
    removeProductSize(input: RemoveProductSizeInput!): Boolean!
    addMultipleProductSizes(input: [ProductSizeInput!]!): [ProductSize!]!
  }
`;

module.exports = ProductSizeTypeDefs;

