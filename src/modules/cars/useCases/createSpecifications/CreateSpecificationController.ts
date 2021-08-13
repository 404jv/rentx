import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    createSpecificationsUseCase.execute({ name, description });

    return response.sendStatus(201);
  }
}

export { CreateSpecificationController };
