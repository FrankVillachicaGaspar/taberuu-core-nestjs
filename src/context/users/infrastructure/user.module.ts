import { Module } from '@nestjs/common';
import { CreateUserController } from './http-api/create-user/create-user.controller';
import { CreateUserUseCase } from '../application/create-user-use-case/create-user-use-case';
import { InMemoryUserRepository } from './repositories/in-memory.user-repository';
import { UserRepository } from '../domain/user.repository';
import { FindUsersByIdUseCase } from '../application/find-user-by-id-use-case/find-user-by-id-use-case';
import { FindUserByIdController } from './http-api/find-user-by-id/find-user-by-id.controller';

@Module({
  controllers: [CreateUserController, FindUserByIdController],
  providers: [
    CreateUserUseCase,
    FindUsersByIdUseCase,
    InMemoryUserRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUsersByIdUseCase],
})
export class UserModule {}
