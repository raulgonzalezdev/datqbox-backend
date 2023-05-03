const { gql } = require('apollo-server');

const UserTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    avatar: String
    role: String!
    is_superuser: Boolean!
    is_active: Boolean!
    addresses: [Address!]
    carts: [Cart!]
    orders: [Order!]
    reviews: [Review!]
    companies: [Company!]
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    avatar: String
    role: String!
    is_superuser: Boolean!
    is_active: Boolean!
  }
  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    addUser(input: UserInput!): AuthPayload!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;

module.exports = UserTypeDefs;
