import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import {
  enFolder,
  IStorageProvider,
} from "@shared/container/providers/StorageProvider/IStorageProvider";
import { setRedis } from "@shared/infra/redis";

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, enFolder.cars);
    }

    await this.storageProvider.save(avatar, enFolder.avatar);

    user.avatar = avatar;

    Object.assign(user, {
      avatar_url: user.avatar_url(),
    });

    await setRedis(`user-${user.id}`, JSON.stringify(user));

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
