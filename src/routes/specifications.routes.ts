import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecifications/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationsController.handle);

export { specificationRoutes };
