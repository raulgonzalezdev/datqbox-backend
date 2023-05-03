const { gql } = require("apollo-server");

const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
    image: String!
    products: [Product!]!
  }
`;

module.exports = categoryTypeDefs;
