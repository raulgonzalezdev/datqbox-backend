const { gql } = require('apollo-server');

const CompositeProductItemsTypeDefs = gql`
type CompositeProductItems {
    id: ID!
    mainProduct: Product!
    includedProduct: Product!
    quantity: Int!
  }
  
  input CreateCompositeProductItemsInput {
    mainProductId: ID!
    includedProductId: ID!
    quantity: Int!
  }
  
  input UpdateCompositeProductItemsInput {
    mainProductId: ID
    includedProductId: ID
    quantity: Int
  }
  
  extend type Query {
    compositeProductItems: [CompositeProductItems!]!
    compositeProductItem(id: ID!): CompositeProductItems
    compositeProducts(mainProductId: ID!): [CompositeProductItems]
  }
  
  extend type Mutation {
    createCompositeProductItems(input: CreateCompositeProductItemsInput!): CompositeProductItems!
    updateCompositeProductItems(mainProductId: ID!, includedProductId: ID!, input: UpdateCompositeProductItemsInput!): CompositeProductItems
    deleteCompositeProductItems(id: ID!): Boolean!
  }
  
`;

module.exports = CompositeProductItemsTypeDefs;