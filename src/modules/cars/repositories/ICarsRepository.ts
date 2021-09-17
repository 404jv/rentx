import { IFindAvailableDTO } from "@modules/cars/dtos/IFindAvailableDTO";

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(data: IFindAvailableDTO): Promise<Car[]>;
}

export { ICarsRepository };
