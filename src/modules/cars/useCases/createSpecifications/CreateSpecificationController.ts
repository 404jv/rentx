import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationUseController {
  constructor(
    private createSpecificationsUseCase: CreateSpecificationUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationsUseCase.execute({ name, description });

    return response.sendStatus(201);
  }
}

export { CreateSpecificationUseController };
