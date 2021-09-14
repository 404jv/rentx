import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import "express-async-errors";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

import "@shared/infra/typeorm";

import "@shared/container";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      error: "error",
      message: `Internal server error: ${error}`,
    });
  }
);

app.listen(3333, () =>
  console.log("🚀 Server is running at http://localhost:3333")
);
