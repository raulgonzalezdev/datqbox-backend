const { gql } = require('apollo-server');

const CurrencyTypeTypeDefs = gql`
  type CurrencyType {
    id: ID!
    name: String!
    symbol: String!
    exchangeRates: [ExchangeRate]
  }

  extend type Query {
    getCurrencyType(id: ID!): CurrencyType
    getAllCurrencyTypes: [CurrencyType]
  }

  input CurrencyTypeInput {
    name: String!
    symbol: String!
  }

  extend type Mutation {
    createCurrencyType(input: CurrencyTypeInput!): CurrencyType
    updateCurrencyType(id: ID!, input: CurrencyTypeInput!): CurrencyType
    deleteCurrencyType(id: ID!): Boolean
  }
`;

module.exports = CurrencyTypeTypeDefs;
