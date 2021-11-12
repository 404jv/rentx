import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    if (!token) {
      throw new AppError("Token missing", 401);
    }

    const { secret_refresh_token, expires_refresh_token_days } = auth;

    const { sub: user_id, email } = verify(
      token,
      secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findUserByIdAndRefreshToken({
        user_id,
        refresh_token: token,
      });

    if (!userToken) {
      throw new AppError("Refresh Token Not Found!", 404);
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = this.createNewRefreshToken(user_id, email);

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      refresh_token,
      expires_date,
      user_id,
    });

    return refresh_token;
  }

  private createNewRefreshToken(user_id: string, email: string): string {
    const { secret_refresh_token, expires_in_refresh_token } = auth;

    const token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    return token;
  }
}

export { RefreshTokenUseCase };
