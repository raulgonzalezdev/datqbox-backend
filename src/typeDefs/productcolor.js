const { gql } = require("apollo-server");

const ProductColorTypeDefs = gql`
  type ProductColor {
    id: ID!
    productId: ID!
    colorId: ID!
  }

  input ProductColorInput {
    productId: ID!
    colorId: ID!
    
  }

  extend type Query {
    productColors: [ProductColor!]!
    getProductColorsByProductId(productId: ID!): [ProductColor!]!
  }

  extend type Mutation {
    addProductColor(productId: ID!, colorId: ID!): ProductColor!
    removeProductColor(id: ID!): Boolean!
  }
`;

module.exports = ProductColorTypeDefs;


  