import { Router } from "express";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  categories.push({
    name,
    description,
  });

  return response.sendStatus(201);
});

export { categoriesRoutes };
