import { CreateError, httpMessages, httpStatusCode } from "./error.utils";

export class NotProvidedException {
  constructor(message: string = httpMessages.NotProvided) {
    throw new CreateError(httpStatusCode.NotProvided, message);
  }
}
