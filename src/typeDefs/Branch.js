const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Branch {
    id: ID!
    name: String!
  }

  extend type Query {
    branches: [Branch!]
    branch(id: ID!): Branch
  }

  extend type Mutation {
    createBranch(name: String!): Branch!
    updateBranch(id: ID!, name: String): Branch!
    deleteBranch(id: ID!): Branch!
  }
`;

module.exports = typeDefs;
