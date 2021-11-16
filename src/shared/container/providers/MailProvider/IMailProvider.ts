import { ISendEmailDTO } from "@shared/container/dtos/ISendEmailDTO";

interface IMailProvider {
  sendMail({ body, subject, to }: ISendEmailDTO): Promise<void>;
}

export { IMailProvider };
