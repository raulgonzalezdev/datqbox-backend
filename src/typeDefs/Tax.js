const { gql } = require('apollo-server');

const taxTypeDefs = gql`
  type Tax {
    id: ID!
    name: String!
    rate: Float!
    taxInvoices: [TaxInvoice]
  }

  extend type Query {
    getTax(id: ID!): Tax
    getAllTaxes: [Tax]
  }

  extend type Mutation {
    addTax(name: String!, rate: Float!): Tax!
    updateTax(id: ID!, input: TaxInput): Tax!
    deleteTax(id: ID!): ID!
  }
  
  input TaxInput {
    name: String
    rate: Float
  }
`;

module.exports = taxTypeDefs;
