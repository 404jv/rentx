interface ICreateRentalDTO {
  id?: string;
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  end_date?: string;
}

export { ICreateRentalDTO };
