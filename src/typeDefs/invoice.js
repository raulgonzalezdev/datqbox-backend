const { gql } = require('apollo-server');
const { GraphQLDate } = require('graphql-iso-date');

const typeDefs = gql`
  scalar Date
  type Invoice {
    id: ID!
    user: User
    companies: [Company]
    branch: Branch
    paymentMethod: PaymentMethod
    invoiceItems: [InvoiceItem]
    taxInvoices: [TaxInvoice] 
    total: Float
    tax: Float
    exchangeRate: ExchangeRate
    status: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getInvoice(id: ID!): Invoice
    getAllInvoices: [Invoice]
  }

  input InvoiceInput {
    userId: ID!
    companyId: ID!
    branchId: ID!
    paymentMethodId: ID!
    total: Float
    tax: Float
    status: String
    exchangeRateId: ID
  }

  type Mutation {
    createInvoice(input: InvoiceInput!): Invoice
    updateInvoice(id: ID!, input: InvoiceInput!): Invoice
    deleteInvoice(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
