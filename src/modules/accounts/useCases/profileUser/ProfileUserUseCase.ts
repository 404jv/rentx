import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
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
    const userRedis = await getRedis(`user-${id}`);

    let user = JSON.parse(userRedis as string);

    if (!user) {
      user = await this.usersRepository.findById(id);
    }

    return UserMapper.toDTO(user);
  }
}

export { ProfileUserUseCase };
