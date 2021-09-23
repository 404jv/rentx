import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  deleteByImageName(image_name: string): Promise<void>;
}

export { ICarImagesRepository };
