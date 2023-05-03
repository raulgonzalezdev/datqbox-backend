const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Color {
    id: ID!
    name: String!
    hexCode: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    colors: [Color!]
    color(id: ID!): Color
  }

  extend type Mutation {
    createColor(name: String!, hexCode: String!): Color!
    updateColor(id: ID!, name: String, hexCode: String): Color!
    deleteColor(id: ID!): Color!
  }
`;

module.exports = typeDefs;
