import http from "node:http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { config } from "./config";
import { typeDefs } from "./schema";
import { createResolvers } from "./resolvers";
import { BookModel } from "./models/book";

async function startServer() {
  const app = express();

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  await mongoose.connect(config.mongoUri);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: createResolvers({
      find: () => BookModel.find(),
      findById: (id) => BookModel.findById(id),
      create: (input) => BookModel.create(input),
      findByIdAndUpdate: (id, update, options) => BookModel.findByIdAndUpdate(id, update, options)
    })
  });

  await apolloServer.start();

  app.use("/graphql", cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer));

  const server = http.createServer(app);

  server.listen(config.port, () => {
    console.log(`Server ready at http://localhost:${config.port}`);
    console.log(`GraphQL endpoint at http://localhost:${config.port}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
