const { gql } = require('apollo-server');

const typeDefs = gql`
  type Invoice {
    id: ID!
    user: User!
    branch: Branch!
    paymentMethod: PaymentMethod!
    total: Float!
    tax: Float!
    status: String!
    invoiceItems: [InvoiceItem!]!
  }

  input CreateInvoiceInput {
    userId: Int!
    branchId: Int!
    paymentMethodId: Int!
    total: Float!
    tax: Float!
    status: String!
  }

  input UpdateInvoiceInput {
    total: Float
    tax: Float
    status: String
  }

  extend type Query {
    getInvoice(id: ID!): Invoice!
    getInvoices: [Invoice!]!
  }

  extend type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice!
    updateInvoice(id: ID!, input: UpdateInvoiceInput!): Invoice!
    deleteInvoice(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;