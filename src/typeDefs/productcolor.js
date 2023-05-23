const { gql } = require("apollo-server");

const ProductColorTypeDefs = gql`

type ProductColor {
  id: ID!
  ProductId: ID!
  ColorId: ID!
  color: Color!
}

  
  input ProductColorInput {
    ProductId: ID!
    ColorId: ID!
    
  }

  input RemoveProductColorInput {
    ProductId: ID!
   
  }

  extend type Query {
    productColors: [ProductColor!]!
    getProductColorsByProductId(ProductId: ID!): [ProductColor!]!
  }

  extend type Mutation {
    addProductColor(ProductId: ID!, ColorId: ID!): ProductColor!
    removeProductColor(input: RemoveProductColorInput!): Boolean!
    addMultipleProductColors(input: [ProductColorInput!]!): [ProductColor!]!
  }
`;

module.exports = ProductColorTypeDefs;


  