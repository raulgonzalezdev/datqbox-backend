const { gql } = require('apollo-server');

const productCostsTypeDefs = gql`
type ProductCosts {
    id: ID!
    productId: ID!
    purchaseCost: Float!
    shippingCost: Float!
    otherCosts: Float!
    taxRateCosts: Float
    isTaxedCost: Boolean
    calcMethod: String
    product: Product!
  }
  
  input CreateProductCostsInput {
    purchaseCost: Float!
    shippingCost: Float!
    otherCosts: Float!
    taxRateCosts: Float
    isTaxedCost: Boolean
    calcMethod: String
    productId: ID!
  }
  
  input UpdateProductCostsInput {
    productId: ID
    purchaseCost: Float
    shippingCost: Float
    taxRateCosts: Float
    isTaxedCost: Boolean
    calcMethod: String
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
