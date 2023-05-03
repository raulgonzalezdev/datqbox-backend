const { gql } = require('apollo-server');

const AddressTypeDefs = gql`
  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
    userId: ID!
  }

  extend type Query {
    addresses: [Address!]
    address(id: ID!): Address
  }

  extend type Mutation {
    createAddress(street: String!, city: String!, state: String!, zipCode: String!, country: String!, userId: ID!): Address!
    updateAddress(id: ID!, street: String, city: String, state: String, zipCode: String, country: String): Address!
    deleteAddress(id: ID!): Address!
  }
`;

module.exports = AddressTypeDefs;
