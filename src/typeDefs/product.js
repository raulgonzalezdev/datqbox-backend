const { gql } = require("apollo-server");

const ProductTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    vendor: String!
    sku: String!
    description: String!
    image: String!
    price: Float!
    category: Category!
    inventory: Float!
    rentalType: String!
    featured: Boolean!
    newarrivals: Boolean!
    taxRate: Float!
    images: [Image!]!
    reviews: [Review!]!
    orderItems: [OrderItem!]!
    productColors: [ProductColor!]!
    productSizes: [ProductSize!]!
  }

  type ProductColor {
    color: Color!
  }

  type ProductSize {
    size: Size!
  }

  input CreateProductInput {
    name: String!
    vendor: String!
    description: String!
    sku: String!
    image: String!
    price: Float!
    categoryId: ID!
    inventory: Float!
    rentalType: String!
    featured: Boolean!
    newarrivals: Boolean!
    taxRate: Float!
  }

  input UpdateProductInput {
    name: String
    vendor: String
    sku: String
    image: String
    description: String!
    price: Float
    categoryId: ID
    inventory: Float
    rentalType: String
    featured: Boolean
    newarrivals: Boolean
    taxRate: Float
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
