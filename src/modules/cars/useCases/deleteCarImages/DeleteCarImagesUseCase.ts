import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { deleteFile } from "@utils/file";

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute(images_name: string[]): Promise<void> {
    images_name.forEach(async (image_name) => {
      await this.carImagesRepository.deleteByImageName(image_name);

      await deleteFile(`./tmp/cars/${image_name}`);
    });
  }
}

export { DeleteCarImagesUseCase };
