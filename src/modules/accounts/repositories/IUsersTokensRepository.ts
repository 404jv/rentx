import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { IFindUserByIdAndRefreshTokenDTO } from "../dtos/IFindUserByIdAndRefreshTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findUserByIdAndRefreshToken(
    data: IFindUserByIdAndRefreshTokenDTO
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
