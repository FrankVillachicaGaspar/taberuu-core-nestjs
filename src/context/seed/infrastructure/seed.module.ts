import { Module } from '@nestjs/common';
import { PopulateDatabaseUseCase } from '../application/populate-database-use-case/populate-database-use-case';
import { PopulateDatabaseController } from './http-api/populate-database/populate-database.controller';
import { SeedRepository } from '../domain/seed.repository';
import { PostgresSeedRepository } from './repositories/postgres-seed.repository';
import { SharedModule } from '@src/shared/shared.module';

@Module({
  controllers: [PopulateDatabaseController],
  providers: [
    PopulateDatabaseUseCase,
    PostgresSeedRepository,
    { provide: SeedRepository, useExisting: PostgresSeedRepository },
  ],
  imports: [SharedModule],
})
export class SeedModule {}
