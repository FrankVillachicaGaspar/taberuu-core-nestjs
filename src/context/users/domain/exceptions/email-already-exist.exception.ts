export class EmailAlreadyExistException extends Error {
  constructor(public readonly email: string) {
    super(`User with email ${email} already exist.`);
  }
}
