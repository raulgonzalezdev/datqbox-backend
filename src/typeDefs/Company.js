const { gql } = require('apollo-server');

const CompanyTypeDefs = gql`
  type Company {
    id: ID!
    name: String!
    address: String!
    phoneNumber: String!
    email: String!
    legalId: String!
    users: [User!]!
  }

  extend type Query {
    company(id: ID!): Company
    companies: [Company!]!
  }

  input CompanyInput {
    name: String!
    address: String!
    phoneNumber: String!
    email: String!
    legalId: String!
  }

  extend type Mutation {
    addCompany(input: CompanyInput!): Company!
    updateCompany(id: ID!, input: CompanyInput!): Company!
    deleteCompany(id: ID!): Company!
  }
`;

module.exports = CompanyTypeDefs;
