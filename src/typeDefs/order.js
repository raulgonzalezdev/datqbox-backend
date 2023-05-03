const { gql } = require("apollo-server");

const typeDefs = gql`
  type Order {
    id: ID!
    userId: Int!
    totalPrice: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
    orderItems: [OrderItem]
  }

  type Query {
    orders: [Order]
    order(id: ID!): Order
  }

  input CreateOrderInput {
    userId: Int!
    totalPrice: Float!
    status: String!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    updateOrder(id: ID!, input: CreateOrderInput!): Order!
    deleteOrder(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
