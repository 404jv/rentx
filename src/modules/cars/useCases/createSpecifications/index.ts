import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationUseController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);

const createSpecificationController = new CreateSpecificationUseController(
  createSpecificationUseCase
);

export { createSpecificationController };
