import "reflect-metadata";

import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@errors/AppError";
import "express-async-errors";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

import "@shared/container";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    error: "error",
    message: `Internal server error: ${error}`,
  });
});

app.listen(3333, () =>
  console.log("🚀 Server is running at http://localhost:3333")
);
