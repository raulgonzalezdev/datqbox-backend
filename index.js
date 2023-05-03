const { ApolloServer, gql } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const typeDefsArray = loadFilesSync(path.join(__dirname, './src/typeDefs'));
const resolversArray = loadFilesSync(path.join(__dirname, './src/resolvers'));

for (const typeDefs of typeDefsArray) {
  console.log('Loading typeDefs file:', typeDefs);
  gql(typeDefs);
}

for (const resolvers of resolversArray) {
  console.log('Loading resolvers file:', resolvers);
  mergeResolvers(require(resolvers));
}

const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
