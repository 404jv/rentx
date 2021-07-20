import { Router } from "express";
import { v4 as uuidV4 } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const category = {
    id: uuidV4(),
    name,
    description,
  };

  categories.push(category);

  return response.sendStatus(201);
});

export { categoriesRoutes };
