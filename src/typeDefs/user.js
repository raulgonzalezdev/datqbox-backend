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
    validateToken(token: String!): Boolean!
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

  input UserUpdateInput {
    firstName: String
    lastName: String
    email: String
    password: String
    avatar: String
    role: String
    is_superuser: Boolean
    is_active: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    addUser(input: UserInput!): AuthPayload!
    updateUser(id: ID!, input: UserUpdateInput!): User!
    deleteUser(id: ID!): Boolean!
    loginUser(input: LoginInput): AuthPayload
    forgotPassword(email: String!): Boolean
    resetPassword(token: String!, password: String!): Boolean
  }
`;

module.exports = UserTypeDefs;
