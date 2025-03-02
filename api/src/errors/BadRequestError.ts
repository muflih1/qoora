export default class BadRequestError extends Error {
  public statusCode: number
  public errorCode: number

  constructor(public message: string) {
    super(message);
    this.statusCode = 400
    this.errorCode = 11399
    Error.captureStackTrace(this, this.constructor)
  }
}