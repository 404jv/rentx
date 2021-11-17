import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const resolveForgotPasswordMail = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await resolveForgotPasswordMail.execute(email);

    return response.sendStatus(200);
  }
}

export { SendForgotPasswordMailController };
