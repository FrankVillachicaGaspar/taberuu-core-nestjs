import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FindUserByIdHttpDto } from './find-user-by-id.http.dto';
import { PrimitiveUser } from '@context/users/domain/user';
import { FindUsersByIdUseCase } from '@context/users/application/find-user-by-id-use-case/find-user-by-id-use-case';
import { UserNotFoundException } from '@src/context/users/domain/exceptions/user-not-found.exception';

@Controller('user')
export class FindUserByIdController {
  constructor(private readonly findUsersByIdUseCase: FindUsersByIdUseCase) {}

  @Get(':id')
  async run(
    @Param() params: FindUserByIdHttpDto,
  ): Promise<{ user: PrimitiveUser }> {
    try {
      return await this.findUsersByIdUseCase.execute(params);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
