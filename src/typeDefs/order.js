const { gql } = require("apollo-server");

const OrderTypeDefs = gql`
  type Order {
    id: ID!
    userId: Int!
    totalPrice: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
    orderItems: [OrderItem!]!
  }

  type OrderItem {
    id: ID!
    orderId: Int!
    productId: Int!
    quantity: Int!
    price: Float!
    createdAt: String!
    updatedAt: String!
    order: Order!       
    product: Product!  
  }

  input CreateOrderInput {
    userId: Int!
    totalPrice: Float!
    status: String!
  }

  input CreateOrderItemInput {
    orderId: Int!
    productId: Int!
    quantity: Int!
    price: Float!
  }

  type Query {
    orders: [Order!]!
    order(id: ID!): Order
    orderItems(orderId: Int!): [OrderItem!]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    createOrderItem(input: CreateOrderItemInput!): OrderItem!
    updateOrder(id: ID!, input: CreateOrderInput!): Order!
    updateOrderItem(id: ID!, input: CreateOrderItemInput!): OrderItem!
    deleteOrder(id: ID!): Boolean
    deleteOrderItem(id: ID!): Boolean
  }
`;

module.exports = OrderTypeDefs;
