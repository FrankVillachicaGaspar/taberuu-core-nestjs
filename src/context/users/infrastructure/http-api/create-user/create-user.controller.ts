import { Body, Controller, Post, Logger } from '@nestjs/common';
import { CreateUserHttpDto } from './create-user.http-dto';
import { CreateUserUseCase } from '@context/users/application/create-user-use-case/create-user-use-case';
import { PrimitiveUser } from '@context/users/domain/user';

@Controller('user')
export class CreateUserController {
  private readonly logger = new Logger(CreateUserController.name);

  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async run(
    @Body() createUserHttpDto: CreateUserHttpDto,
  ): Promise<{ user: PrimitiveUser }> {
    this.logger.log('Creating users in controller');

    return await this.createUserUseCase.execute(createUserHttpDto);
  }
}
