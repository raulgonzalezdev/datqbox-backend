const { gql } = require('apollo-server');
const { GraphQLDate } = require('graphql-iso-date');

const typeDefs = gql`
  scalar Date
  type Invoice {
    id: ID!
    user: User
    companies: [Company]
    branch: Branch
    paymentMethods: [PaymentMethod]
    invoicePaymentMethods: [InvoicePaymentMethod]
    invoiceItems: [InvoiceItem]
    taxInvoices: [TaxInvoice] 
    total: Float
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
    paymentMethodIds: [ID!]
    total: Float
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
