const { gql } = require('apollo-server');

const SizeTypeDefs = gql`
  type Size {
    id: ID!
    name: String!
    products: [Product]
  }

  extend type Query {
    size(id: ID!): Size
    sizes: [Size]
  }

  extend type Mutation {
    createSize(name: String!): Size
    updateSize(id: ID!, name: String!): Size
    deleteSize(id: ID!): Boolean
  }
`;

module.exports = SizeTypeDefs;
