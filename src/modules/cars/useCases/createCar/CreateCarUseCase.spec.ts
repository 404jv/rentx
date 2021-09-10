import { AppError } from "@shared/errors/AppError";

import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car.", async () => {
    const car = await createCarUseCase.execute({
      name: "Name 1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: null,
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: null,
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: null,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: null,
    });

    expect(car.available).toBe(true);
  });
});
