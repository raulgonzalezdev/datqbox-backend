const { gql } = require('apollo-server');

const taxInvoiceTypeDefs = gql`
  type TaxInvoice {
    id: ID!
    invoiceId: Int!
    taxId: Int!
    amount: Float!
    tax: Tax
    invoice: Invoice
  }

  input TaxInvoiceInput {
    invoiceId: Int
    taxId: Int
    amount: Float
  }

  extend type Query {
    getTaxInvoice(id: ID!): TaxInvoice
    getAllTaxInvoices: [TaxInvoice]
  }

  extend type Mutation {
    addTaxInvoice(invoiceId: Int!, taxId: Int!, amount: Float!): TaxInvoice
    updateTaxInvoice(id: ID!, input: TaxInvoiceInput): TaxInvoice
    deleteTaxInvoice(id: ID!): ID!
  }
`;

module.exports = taxInvoiceTypeDefs;


