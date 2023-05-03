const { gql } = require("apollo-server");

const ProductTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    vendor: String!
    image: String!
    price: Float!
    category: Category!
    inventory: Int!
    rentalType: String!
    featured: Boolean!
    newarrivals: Boolean!
    taxRate: Int!
    images: [Image!]!
    reviews: [Review!]!
    orderItems: [OrderItem!]!
    colors: [Color!]!
    sizes: [Size!]!
  }

  input CreateProductInput {
    name: String!
    vendor: String!
    image: String!
    price: Float!
    categoryId: ID!
    inventory: Int!
    rentalType: String!
    featured: Boolean!
    newarrivals: Boolean!
    taxRate: Int!
  }

  input UpdateProductInput {
    name: String
    vendor: String
    image: String
    price: Float
    categoryId: ID
    inventory: Int
    rentalType: String
    featured: Boolean
    newarrivals: Boolean
    taxRate: Int
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

module.exports = ProductTypeDefs;
