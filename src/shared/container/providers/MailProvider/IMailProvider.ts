import { ISendEmailDTO } from "@shared/container/dtos/ISendEmailDTO";

interface IMailProvider {
  sendMail({ path, variables, subject, to }: ISendEmailDTO): Promise<void>;
}

export { IMailProvider };
