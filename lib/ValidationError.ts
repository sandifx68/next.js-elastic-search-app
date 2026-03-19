export default class ValidationError extends Error {
  constructor(public error: string) {
    super(error);
  }
}
