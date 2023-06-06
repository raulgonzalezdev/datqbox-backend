const { gql } = require('apollo-server');

const InvoicePaymentMethodTypeDefs = gql`
type InvoicePaymentMethod {
  invoiceId: ID!
  paymentMethodId: ID!
  invoice: Invoice
  paymentMethod: PaymentMethod
}

  
  input InvoicePaymentMethodInput {
    invoiceId: ID!
    paymentMethodId: ID!
  }
  
  extend type Mutation {
    createInvoicePaymentMethod(input: InvoicePaymentMethodInput!): InvoicePaymentMethod
    deleteInvoicePaymentMethod(invoiceId: ID!, paymentMethodId: ID!): Boolean
  }
`;

module.exports = InvoicePaymentMethodTypeDefs;
