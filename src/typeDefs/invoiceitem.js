const { gql } = require('apollo-server');

const InvoiceItemTypeDefs = gql`
  type InvoiceItem {
    id: ID!
    invoiceId: Int!
    productId: Int!
    quantity: Int!
    price: Float!
    product: Product
  }

  input InvoiceItemInput {
    invoiceId: Int!
    productId: Int!
    quantity: Int!
    price: Float!
  }

  type Query {
    invoiceItems: [InvoiceItem!]!
    invoiceItem(id: ID!): InvoiceItem
  }

  type Mutation {
    createInvoiceItem(input: InvoiceItemInput!): InvoiceItem!
    updateInvoiceItem(id: ID!, input: InvoiceItemInput!): InvoiceItem!
    deleteInvoiceItem(id: ID!): Boolean!
  }
`;

module.exports = InvoiceItemTypeDefs;
