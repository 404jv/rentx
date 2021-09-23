import { getRepository, Repository } from "typeorm";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

import { CarImage } from "../entities/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  public repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  async deleteByImageName(image_name: string): Promise<void> {
    await this.repository.delete({ image_name });
  }
}

export { CarImagesRepository };
