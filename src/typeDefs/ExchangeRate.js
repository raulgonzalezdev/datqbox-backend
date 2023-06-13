const { gql } = require('apollo-server');
const { GraphQLDate } = require('graphql-iso-date');

const ExchangeRateTypeDefs = gql`
  scalar Date

  type ExchangeRate {
    id: ID!
    currencyId: Int!
    rate: Float!
    date: Date!
    currencyType: CurrencyType
    
  }

  extend type Query {
    getExchangeRate(id: ID!): ExchangeRate
    getAllExchangeRates: [ExchangeRate]
    getExchangeRateByCurrencyId(currencyId: ID!): [ExchangeRate]
  }

  input ExchangeRateInput {
    currencyId: Int!
    rate: Float!
    date: Date!
  }

  extend type Mutation {
    createExchangeRate(input: ExchangeRateInput!): ExchangeRate
    updateExchangeRate(id: ID!, input: ExchangeRateInput!): ExchangeRate
    deleteExchangeRate(id: ID!): Boolean
  }
`;

module.exports = ExchangeRateTypeDefs;
