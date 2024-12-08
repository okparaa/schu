import { CreateError, httpMessages, httpStatusCode } from "./error.utils";

export class BadRequestException {
  constructor(message: string = httpMessages.BadRequest) {
    throw new CreateError(httpStatusCode.BadRequest, message);
  }
}
