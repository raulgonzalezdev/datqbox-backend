// review.typeDefs.js
const { gql } = require("apollo-server");

const typeDefs = gql`
type Review {
id: ID!
user: User!
product: Product!
rating: Int!
comment: String
}

input ReviewInput {
userId: Int!
productId: Int!
rating: Int!
comment: String
}

type Mutation {
createReview(input: ReviewInput!): Review!
}

type Query {
getReviews: [Review!]!
}
`;

module.exports = typeDefs;