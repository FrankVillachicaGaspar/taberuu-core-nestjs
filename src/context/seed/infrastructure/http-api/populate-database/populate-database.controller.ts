import { Controller, Get } from '@nestjs/common';
import { PopulateDatabaseUseCase } from '@src/context/seed/application/populate-database-use-case/populate-database-use-case';

@Controller('seed')
export class PopulateDatabaseController {
  constructor(
    private readonly populateDatabaseUseCase: PopulateDatabaseUseCase,
  ) {}

  @Get('populate')
  async run(): Promise<void> {
    await this.populateDatabaseUseCase.execute();
  }
}
