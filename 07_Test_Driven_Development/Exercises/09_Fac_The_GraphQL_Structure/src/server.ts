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

// This async function wires the full app so startup can await DB and Apollo readiness.
async function startServer() {
  const app = express();

  // Basic REST health route for quick smoke checks and uptime probes.
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Connect Mongoose before handling requests so resolvers can access models safely.
  await mongoose.connect(config.mongoUri);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: createResolvers({
      find: () => BookModel.find(),
      create: (input) => BookModel.create(input)
    })
  });

  // Apollo server must start before middleware can be mounted.
  await apolloServer.start();

  // Middleware order matters: CORS and JSON parsing run before GraphQL handler.
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
