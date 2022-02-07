import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserMapper } from "@modules/accounts/mappers/UserMapper";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRedis } from "@shared/infra/redis";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    let user = await this.findUserInCache(id);

    if (!user) {
      user = await this.usersRepository.findById(id);
    }

    return UserMapper.toDTO(user);
  }

  async findUserInCache(id: string): Promise<User> {
    const userRedis = await getRedis(`user-${id}`);

    return JSON.parse(userRedis as string) as User;
  }
}

export { ProfileUserUseCase };
