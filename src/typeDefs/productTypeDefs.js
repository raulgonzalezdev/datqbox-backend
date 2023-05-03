const { gql } = require("apollo-server");

const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    vendor: String!
    image: String!
    price: Float!
    category: Category
    inventory: Int
    rentalType: String
    availability: [String!]
    location: Location
    featured: Boolean!
    newarrivals: Boolean!
    taxRate: Int! 
  }
`;

module.exports = productTypeDefs;
