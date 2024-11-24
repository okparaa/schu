import { CreateError, httpMessages, httpStatusCode } from "./error.utils";

export class NotUpdatedException {
  constructor(message: string = httpMessages.NotUpdated) {
    throw new CreateError(httpStatusCode.NotUpdated, message);
  }
}
