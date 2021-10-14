import { IFindAvailableDTO } from "@modules/cars/dtos/IFindAvailableDTO";

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IUpdateAvailableDTO } from "../dtos/IUpdateAvailableDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(data: IFindAvailableDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(data: IUpdateAvailableDTO): Promise<Car>;
}

export { ICarsRepository };
