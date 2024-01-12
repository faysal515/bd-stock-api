import "reflect-metadata";
import express from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { PriceController } from "./controllers/PriceController";
import { GlobalErrorHandler } from "./middlewares/ErrorMiddleware";

useContainer(Container);

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Create Express server with routing-controllers
const expressApp = createExpressServer({
  controllers: [PriceController],
  middlewares: [GlobalErrorHandler],
});

// Use the routing-controllers app as middleware in the express app
app.use(expressApp);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
