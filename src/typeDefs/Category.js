const { gql } = require('apollo-server');

const CategoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
    image: String!
    products: [Product!]!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }

  input CategoryInput {
    name: String!
    image: String!
  }

  extend type Mutation {
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!
  }
`;

module.exports = CategoryTypeDefs;

