const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    addresses: [Address!]!
    address(id: ID!): Address
    branches: [Branch!]!
    branch(id: ID!): Branch
    carts: [Cart!]!
    cart(id: ID!): Cart
    cartItems: [CartItem!]!
    cartItem(id: ID!): CartItem
    categories: [Category!]!
    category(id: ID!): Category
    colors: [Color!]!
    color(id: ID!): Color
    paymentMethods: [PaymentMethod!]!
    paymentMethod(id: ID!): PaymentMethod
    products: [Product!]!
    product(id: ID!): Product
    reviews: [Review!]!
    review(id: ID!): Review
    sizes: [Size!]!
    size(id: ID!): Size
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
    addresses: [Address!]!
    orders: [Order!]!
    cart: Cart
    reviews: [Review!]!
  }

  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
    user: User!
  }

  type Branch {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Cart {
    id: ID!
    user: User!
    cartItems: [CartItem!]!
  }

  type CartItem {
    id: ID!
    cart: Cart!
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Category {
    id: ID!
    name: String!
    image: String!
    products: [Product!]!
  }

  type Color {
    id: ID!
    name: String!
    hexCode: String!
    products: [Product!]!
  }

  type PaymentMethod {
    id: ID!
    name: String!
    orders: [Order!]!
  }

  type Product {
    id: ID!
    name: String!
    vendor: String!
    image: String!
    price: Float!
    category: Category!
    branch: Branch!
    inventory: Int!
    rentalType: String
    featured: Boolean!
    newarrivals: Boolean!
    description: String
    sizes: [Size!]!
    colors: [Color!]!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    user: User!
    product: Product!
    rating: Int!
    comment: String!
  }

  type Size {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

module.exports = typeDefs;
