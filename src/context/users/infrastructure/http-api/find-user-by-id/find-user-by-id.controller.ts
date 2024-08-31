import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FindUserByIdHttpDto } from './find-user-by-id.http.dto';
import { FindUsersByIdUseCase } from '@src/context/users/application/use-cases/find-user-by-id-use-case/find-user-by-id-use-case';
import { UserResponse } from '@src/context/users/application/dtos/user-response.dto';
import { UserNotFoundException } from '@src/context/users/domain/errors/user-not-found.error';
import { ApiResponse } from '@shared/models/api-response.model';

@Controller('user')
export class FindUserByIdController {
  constructor(private readonly findUsersByIdUseCase: FindUsersByIdUseCase) {}

  @Get(':id')
  async run(
    @Param() params: FindUserByIdHttpDto,
  ): Promise<ApiResponse<UserResponse, undefined>> {
    try {
      const result = await this.findUsersByIdUseCase.execute(params);
      return {
        data: result.user,
        code: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
