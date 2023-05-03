const { gql } = require('apollo-server');

const ImageTypeDefs = gql`
  type Image {
    id: ID!
    url: String!
    product: Product!
  }

  extend type Query {
    images: [Image!]!
    image(id: ID!): Image!
  }

  input AddImageInput {
    url: String!
    productId: ID!
  }

  extend type Mutation {
    addImage(input: AddImageInput!): Image!
  }
`;

module.exports = ImageTypeDefs;
