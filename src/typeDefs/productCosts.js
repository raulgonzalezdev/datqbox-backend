const { gql } = require('apollo-server');

const productCostsTypeDefs = gql`
type ProductCosts {
    id: ID!
    purchaseCost: Float!
    shippingCost: Float!
    otherCosts: Float!
    product: Product!
  }
  
  input CreateProductCostsInput {
    purchaseCost: Float!
    shippingCost: Float!
    otherCosts: Float!
    productId: ID!
  }
  
  input UpdateProductCostsInput {
    purchaseCost: Float
    shippingCost: Float
    otherCosts: Float
  }
  
  extend type Query {
    productCosts: [ProductCosts!]!
    productCost(id: ID!): ProductCosts
  }
  
  extend type Mutation {
    createProductCosts(input: CreateProductCostsInput!): ProductCosts!
    updateProductCosts(id: ID!, input: UpdateProductCostsInput!): ProductCosts!
    deleteProductCosts(id: ID!): Boolean!
  }
  
`;

module.exports = productCostsTypeDefs;
