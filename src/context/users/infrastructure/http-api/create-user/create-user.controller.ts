import {
  Body,
  Controller,
  Post,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserHttpDto } from './create-user.http-dto';
import { CreateUserUseCase } from '@src/context/users/application/use-cases/create-user-use-case/create-user-use-case';
import { EmailAlreadyExistException } from '@src/context/users/domain/errors/email-already-exist.error';
import { UserResponse } from '@src/context/users/application/dtos/user-response.dto';

@Controller('user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async run(
    @Body() createUserHttpDto: CreateUserHttpDto,
  ): Promise<{ user: UserResponse }> {
    try {
      return await this.createUserUseCase.execute(createUserHttpDto);
    } catch (error) {
      if (error instanceof EmailAlreadyExistException)
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }
}
