import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleService } from './drizzle.service';
import { ConfigModule } from '@nestjs/config';

describe('DrizzleService', () => {
  let service: DrizzleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrizzleService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<DrizzleService>(DrizzleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
