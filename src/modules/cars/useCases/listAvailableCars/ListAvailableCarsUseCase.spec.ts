import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCars: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCars = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      brand: "Car Brand",
      category_id: "category_id ",
      daily_rate: 140,
      description: "Car Description",
      fine_amount: 100,
      license_plate: "ABCD-123",
    });

    const cars = await listAvailableCars.execute({});

    expect(cars).toEqual([car]);
  });

  it("Shoudl be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      brand: "Car_brand_test",
      category_id: "category_id ",
      daily_rate: 140,
      description: "Car Description",
      fine_amount: 100,
      license_plate: "ABCD-1234",
    });

    const cars = await listAvailableCars.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("Shoudl be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      brand: "Car_brand_test",
      category_id: "category_id ",
      daily_rate: 140,
      description: "Car Description",
      fine_amount: 100,
      license_plate: "ABCD-1235",
    });

    const cars = await listAvailableCars.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });

  it("Shoudl be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      brand: "Car_brand_test",
      category_id: "12345",
      daily_rate: 140,
      description: "Car Description",
      fine_amount: 100,
      license_plate: "ABCD-1236",
    });

    const cars = await listAvailableCars.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
