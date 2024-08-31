export class UserNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`User with id ${id} not found.`);
  }
}
