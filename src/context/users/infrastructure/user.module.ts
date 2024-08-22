import { Module } from '@nestjs/common';
import { CreateUserController } from './http-api/create-user/create-user.controller';
import { CreateUserUseCase } from '../application/create-user-use-case/create-user-use-case';
import { UserRepository } from '../domain/user.repository';
import { FindUsersByIdUseCase } from '../application/find-user-by-id-use-case/find-user-by-id-use-case';
import { FindUserByIdController } from './http-api/find-user-by-id/find-user-by-id.controller';
import { SharedModule } from '@src/shared/shared.module';
import { PostgresUserRepository } from './repositories/postgres-user-repository';

@Module({
  controllers: [CreateUserController, FindUserByIdController],
  providers: [
    CreateUserUseCase,
    FindUsersByIdUseCase,
    PostgresUserRepository,
    {
      provide: UserRepository,
      useExisting: PostgresUserRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUsersByIdUseCase],
  imports: [SharedModule],
})
export class UserModule {}
