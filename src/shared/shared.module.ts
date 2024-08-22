import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class SharedModule {}
