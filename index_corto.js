const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require('cors');

// Importamos solo los typeDefs y resolvers de Upload
const UploadTypeDefs = require("./src/typeDefs/Upload");
const UploadResolvers = require("./src/resolvers/Upload");

// Creamos las definiciones de tipos y resolvers para el servidor Apollo
const typeDefs = gql`
  ${UploadTypeDefs}
`;

const resolvers = UploadResolvers;

// Configuramos Apollo Server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  uploads: false, // Desactiva las subidas integradas de Apollo Server
});

const app = express();

// Configuramos CORS
const corsOptions = {
  origin: '*', 
  credentials: true,
};

app.use(cors(corsOptions));

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 20 })); // Configura graphql-upload
app.use('/uploads', express.static('uploads'));

(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: false });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
