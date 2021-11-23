import { ISendEmailDTO } from "@shared/container/dtos/ISendEmailDTO";

import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private message: ISendEmailDTO[] = [];

  async sendMail({
    path,
    variables,
    subject,
    to,
  }: ISendEmailDTO): Promise<void> {
    this.message.push({
      path,
      variables,
      subject,
      to,
    });
  }
}

export { MailProviderInMemory };
