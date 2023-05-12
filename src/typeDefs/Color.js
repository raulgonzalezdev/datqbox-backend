const { gql } = require('apollo-server');

const ColorTypeDefs = gql`
  type Color {
    id: ID!
    name: String!
    hexCode: String!
    createdAt: String!
    updatedAt: String!
  }

  input ColorInput {
    name: String!
    hexCode: String!
  }

  extend type Query {
    colors: [Color!]
    color(id: ID!): Color
  }

  extend type Mutation {
    createColor(input: ColorInput!): Color!
    updateColor(id: ID!, input: ColorInput): Color!
    deleteColor(id: ID!): Color!
  }
`;

module.exports = ColorTypeDefs;
