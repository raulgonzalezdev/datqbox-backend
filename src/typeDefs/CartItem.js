const { gql } = require('apollo-server');

const CartItemTypeDefs = gql`
  type CartItem {
    id: ID!
    cartId: Int!
    product: Product!
    quantity: Int!
    price: Float!
  }

  extend type Query {
    getCartItems(cartId: ID!): [CartItem!]!
  }

  extend type Mutation {
    addCartItem(cartId: ID!, productId: ID!, quantity: Int!, price: Float!): CartItem!
    updateCartItem(id: ID!, quantity: Int!): CartItem!
    deleteCartItem(id: ID!): Boolean!
  }
`;

module.exports = CartItemTypeDefs;
