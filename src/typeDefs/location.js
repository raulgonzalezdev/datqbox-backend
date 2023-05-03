const { gql } = require("apollo-server");

const LocationTypeDefs = gql`
  type Location {
    id: ID!
    lat: Float!
    lng: Float!
  }

  input LocationInput {
    lat: Float!
    lng: Float!
  }

  type Query {
    locations: [Location!]!
    location(id: ID!): Location
  }

  type Mutation {
    createLocation(input: LocationInput!): Location!
    updateLocation(id: ID!, input: LocationInput!): Location!
    deleteLocation(id: ID!): Boolean!
  }
`;

module.exports = LocationTypeDefs;
