import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationRoutes };
