import nodemailer, { Transporter } from "nodemailer";

import { ISendEmailDTO } from "@shared/container/dtos/ISendEmailDTO";

import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((error) => console.error(error));
  }

  async sendMail({ body, subject, to }: ISendEmailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      text: body,
      html: body,
    });

    console.log("Message sent: ", message.messageId);
    console.log("Preview url: ", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
