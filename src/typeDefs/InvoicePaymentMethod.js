const { gql } = require('apollo-server');

const InvoicePaymentMethodTypeDefs = gql`
type InvoicePaymentMethod {
  invoiceId: ID!
  paymentMethodId: ID!
  amount: Float
  invoice: Invoice
  paymentMethod: PaymentMethod
}

  
  input InvoicePaymentMethodInput {
    invoiceId: ID!
    paymentMethodId: ID!
    amount: Float
  }
  
  extend type Mutation {
    createInvoicePaymentMethod(input: InvoicePaymentMethodInput!): InvoicePaymentMethod
    deleteInvoicePaymentMethod(invoiceId: ID!, paymentMethodId: ID!): Boolean
  }
`;

module.exports = InvoicePaymentMethodTypeDefs;
