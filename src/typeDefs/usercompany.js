const { gql } = require('apollo-server');

const typeDefs = gql`
  type UserCompany {
    id: ID!
    user: User!
    company: Company!
  }

  extend type Query {
    userCompanies: [UserCompany!]!
    userCompany(id: ID!): UserCompany
  }

  extend type Mutation {
    createUserCompany(userId: ID!, companyId: ID!): UserCompany!
    deleteUserCompany(id: ID!): UserCompany!
  }
`;

module.exports = typeDefs;
