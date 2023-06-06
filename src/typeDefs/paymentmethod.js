const { gql } = require("apollo-server");

const PaymentMethodTypeDefs = gql`
  type PaymentMethod {
    id: ID!
    name: String!
    description: String!
    image: String
    invoices: [Invoice]!
  }

  input PaymentMethodInput {
    name: String!
    description: String!
    image: String
  }

  type Query {
    paymentMethods: [PaymentMethod!]!
    paymentMethod(id: ID!): PaymentMethod!
  }

  type Mutation {
    createPaymentMethod(input: PaymentMethodInput!): PaymentMethod!
    updatePaymentMethod(id: ID!, input: PaymentMethodInput!): PaymentMethod!
    deletePaymentMethod(id: ID!): Boolean!
  }
`;

module.exports = PaymentMethodTypeDefs;


  