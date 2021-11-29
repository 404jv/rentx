import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMapper } from "@modules/accounts/mappers/UserMapper";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMapper.toDTO(user);
  }
}

export { ProfileUserUseCase };
