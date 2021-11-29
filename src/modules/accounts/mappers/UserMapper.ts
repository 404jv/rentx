import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMapper {
  static toDTO({
    avatar,
    driver_license,
    email,
    id,
    name,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      avatar,
      driver_license,
      email,
      id,
      name,
      avatar_url,
    });

    return user;
  }
}

export { UserMapper };
