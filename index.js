
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');


const { merge } = require("lodash");
const cors = require('cors');
const path = require('path');
require('dotenv').config();


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
const UploadTypeDefs = require("./src/typeDefs/Upload");
const taxTypeDefs = require("./src/typeDefs/Tax");
const taxInvoiceTypeDefs = require("./src/typeDefs/TaxInvoice");
const ExchangeRateTypeDefs = require("./src/typeDefs/ExchangeRate");
const CurrencyTypeTypeDefs = require("./src/typeDefs/CurrencyType");
const CompositeProductItemsTypeDefs = require("./src/typeDefs/compositeProductItems")
const productCostsTypeDefs = require("./src/typeDefs/productCosts")
const InvoicePaymentMethodTypeDefs = require("./src/typeDefs/InvoicePaymentMethod")

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
const UploadReolvers = require("./src/resolvers/Upload");
const taxResolvers = require("./src/resolvers/Tax");
const taxInvoiceResolvers = require("./src/resolvers/TaxInvoice");
const CurrencyTypeResolvers = require("./src/resolvers/CurrencyType");
const ExchangeRateResolvers = require("./src/resolvers/ExchangeRate");
const compositeProductItemsResolvers = require("./src/resolvers/compositeProductItems")
const productCostsResolvers = require("./src/resolvers/productCosts")
const InvoicePaymentMethodResolvers = require("./src/resolvers/InvoicePaymentMethod")

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
  ${UploadTypeDefs}
  ${taxTypeDefs}
  ${taxInvoiceTypeDefs}
  ${ExchangeRateTypeDefs}
  ${CurrencyTypeTypeDefs}
  ${CompositeProductItemsTypeDefs}
  ${productCostsTypeDefs}
  ${InvoicePaymentMethodTypeDefs}


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
  UserCompanyResolvers,
  UploadReolvers,
  taxResolvers,
  taxInvoiceResolvers,
  CurrencyTypeResolvers,
  ExchangeRateResolvers,
  compositeProductItemsResolvers,
  productCostsResolvers,
  InvoicePaymentMethodResolvers,

);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const path = req.body.operationName;  // Obteniendo el nombre de la operación
   
    const publicPaths = ['LoginUser', 'AddUser', 'ValidateToken'];  // Define tus rutas públicas aquí

    if (publicPaths.includes(path)) {
      // Si la ruta está en la lista de rutas públicas, se puede acceder a ella sin un token
      return {};
    }

    // Si no es una ruta pública, entonces necesitamos autenticar el token
    try {
      const decodedToken = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
       return { user: decodedToken };
      
    } catch (e) {
      console.error(e);
      throw new AuthenticationError('Authentication token is invalid, please log in');
    }
  },
});

const app = express();

// Configura CORS con opciones personalizadas
const corsOptions = {
  origin: '*', 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 20 })); 

app.use('/uploads', express.static('uploads'));

// Agrega la función 'start' de forma asíncrona antes de llamar a 'applyMiddleware'
(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: false });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
