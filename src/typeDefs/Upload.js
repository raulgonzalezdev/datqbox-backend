const { gql } = require("apollo-server");

const UploadTypeDefs = gql`
scalar Upload

type File {
  filename: String!
  mimetype: String!
  encoding: String!
}

type Query {
  _: Boolean
}

type Image {
  url: String
  filename: String
}

type Query {
  uploadedImages: [Image]
}


type Mutation {
  singleUpload(file: Upload!): File!
  multipleUpload(files: [Upload!]!): [File!]!
}
`;
module.exports = UploadTypeDefs;

