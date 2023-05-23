const { gql } = require('apollo-server');

const ImageTypeDefs = gql`
  type Image {
    id: ID!
    url: String!
    product: Product
  }

  extend type Query {
    images: [Image!]!
    image(id: ID!): Image!
  }

  input ProductInput {
    id: ID!
  }

  input AddImageInput {
    url: String!
    product: ProductInput!
  }

  input AddImagesInput {
    images: [AddImageInput!]!
  }

  extend type Mutation {
    addImage(input: AddImageInput!): Image!
    addImages(input: AddImagesInput!): [Image!]!
    removeImage(id: ID!): Boolean!
    removeProductImages(productId: ID!): Boolean!
  }
`;

module.exports = ImageTypeDefs;
