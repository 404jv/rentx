import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IFindUserByIdAndRefreshTokenDTO } from "@modules/accounts/dtos/IFindUserByIdAndRefreshTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private repository: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, data);
    this.repository.push(userToken);

    return userToken;
  }

  async findUserByIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IFindUserByIdAndRefreshTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.repository.find((ut) => ut.id === id);
    const userTokenIndex = this.repository.indexOf(userToken);
    this.repository.splice(userTokenIndex);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = this.repository.find(
      (ut) => ut.refresh_token === refreshToken
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
