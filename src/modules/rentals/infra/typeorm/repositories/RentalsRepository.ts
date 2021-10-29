import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rentalOpenByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return rentalOpenByCar;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rentalOpenByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return rentalOpenByUser;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.repository.save(rental);

    return rental;
  }

  findById(id: string): Promise<Rental> {
    const rental = this.repository.findOne(id);

    return rental;
  }
}

export { RentalsRepository };
