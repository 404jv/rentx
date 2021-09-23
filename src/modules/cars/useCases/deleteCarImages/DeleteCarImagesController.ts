import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCarImagesUseCase } from "./DeleteCarImagesUseCase";

class DeleteCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { images_name } = request.body;

    const deleteCarImagesUseCase = container.resolve(DeleteCarImagesUseCase);

    await deleteCarImagesUseCase.execute(images_name);

    return response.sendStatus(200);
  }
}

export { DeleteCarImagesController };
