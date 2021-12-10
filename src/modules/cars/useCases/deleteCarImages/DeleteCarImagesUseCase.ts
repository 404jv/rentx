import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import {
  enFolder,
  IStorageProvider,
} from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(images_name: string[]): Promise<void> {
    images_name.forEach(async (image_name) => {
      await this.carImagesRepository.deleteByImageName(image_name);

      await this.storageProvider.delete(image_name, enFolder.cars);
    });
  }
}

export { DeleteCarImagesUseCase };
