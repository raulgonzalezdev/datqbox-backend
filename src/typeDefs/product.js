const { gql } = require("apollo-server");

const ProductTypeDefs = gql`
  type Product {
    id: ID!
    sku: String!
    categoryId: ID!
    name: String!
    description: String!
    unit: String
    image: String!
    price: Float!
    inventory: Float!
    rentalType: String!
    featured: Boolean!
    taxInclued: Boolean
    newarrivals: Boolean!
    taxRate: Float!
    exchangeRateId: ID!
    requiresPrescription: Boolean
    expirationDate: String
    dosage: String
    usageInstructions: String
    contraindications: String
    activeIngredient: String
    vendor: String!
    category: Category!
    images: [Image!]!
    reviews: [Review!]!
    orderItems: [OrderItem!]!
    productColors: [ProductColor!]!
    productSizes: [ProductSize!]!
    exchangeRate: ExchangeRate
    isComposite: Boolean
    mainProducts: [CompositeProductItems!]
    includedProducts: [CompositeProductItems!]
    productCosts: ProductCosts
  }

  type ProductColor {
    color: Color!
  }

  type ProductSize {
    size: Size!
  }

  input CreateProductInput {
    sku: String!
    categoryId: ID!
    name: String!
    description: String!
    unit: String
    image: String!
    price: Float!
    inventory: Float!
    rentalType: String!
    featured: Boolean!
    taxInclued: Boolean
    newarrivals: Boolean!
    taxRate: Float!
    exchangeRateId: ID!
    requiresPrescription: Boolean!
    expirationDate: String
    dosage: String
    usageInstructions: String
    contraindications: String
    activeIngredient: String
    vendor: String!
    isComposite: Boolean
  }

  input UpdateProductInput {
    sku: String
    categoryId: ID
    name: String
    description: String
    unit: String
    image: String
    price: Float
    inventory: Float
    rentalType: String
    featured: Boolean
    taxInclued: Boolean
    newarrivals: Boolean
    taxRate: Float
    exchangeRateId: ID
    requiresPrescription: Boolean
    expirationDate: String
    dosage: String
    usageInstructions: String
    contraindications: String
    activeIngredient: String
    vendor: String
    isComposite: Boolean
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
