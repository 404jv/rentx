import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let mailProvider: MailProviderInMemory;

describe("Send forgot password mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "323238",
      email: "ji@jocode.sn",
      name: "Lura Carpenter",
      password: "123",
    });

    await sendForgotPasswordMailUseCase.execute("ji@jocode.sn");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if the user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("non.existent.email@test.com")
    ).rejects.toEqual(new AppError("User not found!", 404));
  });

  it("should be able to create an user token", async () => {
    const generateToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "679804",
      email: "hobaj@wokkur.mo",
      name: "Violet Cortez",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("hobaj@wokkur.mo");

    expect(generateToken).toBeCalled();
  });
});
