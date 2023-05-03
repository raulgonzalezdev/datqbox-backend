const { gql } = require("apollo-server");

const TypeDefs = gql`
  type PaymentMethod {
    id: ID!
    name: String!
    description: String!
  }

  input PaymentMethodInput {
    name: String!
    description: String!
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

module.exports = TypeDefs;

  