'use strict';

const { UserInputError } = require('apollo-server-express');
const { Cart, CartItem, Product } = require('../../models');

// TypeDefs
const { gql } = require("apollo-server");

const typeDefs = gql`
  type Cart {
    id: ID!
    userId: Int!
    items: [CartItem!]!
  }

  type Mutation {
    createCart(userId: Int!): Cart!
    addItemToCart(cartId: Int!, productId: Int!, quantity: Int!, price: Float!): CartItem!
    removeItemFromCart(id: Int!): CartItem!
  }

  type Query {
    getCart(id: Int!): Cart!
  }

  type CartItem {
    id: ID!
    cartId: Int!
    productId: Int!
    quantity: Int!
    price: Float!
    product: Product!
  }
`;
module.exports = typeDefs;
