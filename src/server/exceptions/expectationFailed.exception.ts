import { CreateError, httpMessages, httpStatusCode } from "./error.utils";

export class ExpectationFailedException {
  constructor(message: string = httpMessages.ExpectationFailed) {
    throw new CreateError(httpStatusCode.ExpectationFailed, message);
  }
}
