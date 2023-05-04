//const { ApolloServer, gql } = require("apollo-server");
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { merge } = require("lodash");
const cors = require('cors');


// Import typeDefs
const AddressTypeDefs = require("./src/typeDefs/Address");
const BranchTypeDefs = require("./src/typeDefs/Branch");
const CartTypeDefs = require("./src/typeDefs/Cart");
const CartItemTypeDefs = require("./src/typeDefs/CartItem");
const CategoryTypeDefs = require("./src/typeDefs/Category");
const ColorTypeDefs = require("./src/typeDefs/Color");
const CompanyTypeDefs = require("./src/typeDefs/Company");
const ImageTypeDefs = require("./src/typeDefs/image");
const InvoiceTypeDefs = require("./src/typeDefs/invoice");
const InvoiceItemTypeDefs = require("./src/typeDefs/invoiceitem");
const LocationTypeDefs = require("./src/typeDefs/location");
const OrderTypeDefs = require("./src/typeDefs/order");
const PaymentMethodTypeDefs = require("./src/typeDefs/paymentmethod");
const ProductTypeDefs = require("./src/typeDefs/product");
const ProductColorTypeDefs = require("./src/typeDefs/productcolor");
const ProductSizeTypeDefs = require("./src/typeDefs/productsize");
const ReviewTypeDefs = require("./src/typeDefs/review");
const SizeTypeDefs = require("./src/typeDefs/size");
const UserTypeDefs = require("./src/typeDefs/user");
const UserCompanyTypeDefs = require("./src/typeDefs/usercompany");

// Import resolvers
const AddressResolvers = require("./src/resolvers/Address");
const BranchResolvers = require("./src/resolvers/Branch");
const CartResolvers = require("./src/resolvers/Cart");
const CartItemResolvers = require("./src/resolvers/CartItem");
const CategoryResolvers = require("./src/resolvers/Category");
const ColorResolvers = require("./src/resolvers/Color");
const CompanyResolvers = require("./src/resolvers/Company");
const ImageResolvers = require("./src/resolvers/image");
const InvoiceResolvers = require("./src/resolvers/invoice");
const InvoiceItemResolvers = require("./src/resolvers/invoiceitem");
const LocationResolvers = require("./src/resolvers/location");
const OrderResolvers = require("./src/resolvers/order");
const PaymentMethodResolvers = require("./src/resolvers/paymentmethod");
const ProductResolvers = require("./src/resolvers/product");
const ProductColorResolvers = require("./src/resolvers/productcolor");
const ProductSizeResolvers = require("./src/resolvers/productsize");
const ReviewResolvers = require("./src/resolvers/review");
const SizeResolvers = require("./src/resolvers/size");
const UserResolvers = require("./src/resolvers/user");
const UserCompanyResolvers = require("./src/resolvers/usercompany");

// Combine typeDefs
const typeDefs = gql`
  ${AddressTypeDefs}
  ${BranchTypeDefs}
  ${CartTypeDefs}
  ${CartItemTypeDefs}
  ${CategoryTypeDefs}
  ${ColorTypeDefs}
  ${CompanyTypeDefs}
  ${ImageTypeDefs}
  ${InvoiceTypeDefs}
  ${InvoiceItemTypeDefs}
  ${LocationTypeDefs}
  ${OrderTypeDefs}
  ${PaymentMethodTypeDefs}
  ${ProductTypeDefs}
  ${ProductColorTypeDefs}
  ${ProductSizeTypeDefs}
  ${ReviewTypeDefs}
  ${SizeTypeDefs}
  ${UserTypeDefs}
  ${UserCompanyTypeDefs}
  `;

// Combine resolvers
const resolvers = merge(
  AddressResolvers,
  BranchResolvers,
  CartResolvers,
  CartItemResolvers,
  CategoryResolvers,
  ColorResolvers,
  CompanyResolvers,
  ImageResolvers,
  InvoiceResolvers,
  InvoiceItemResolvers,
  LocationResolvers,
  OrderResolvers,
  PaymentMethodResolvers,
  ProductResolvers,
  ProductColorResolvers,
  ProductSizeResolvers,
  ReviewResolvers,
  SizeResolvers,
  UserResolvers,
  UserCompanyResolvers
);

// ...
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// Configura CORS con opciones personalizadas
const corsOptions = {
  origin: '*', // Reemplaza con el dominio de tu aplicación cliente
  credentials: true, // Habilita el envío de credenciales (cookies, encabezados de autorización, etc.)
};

app.use(cors(corsOptions));

// Agrega la función 'start' de forma asíncrona antes de llamar a 'applyMiddleware'
(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: false });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
