import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { PopulateDatabaseUseCase } from '@src/context/seed/application/populate-database-use-case/populate-database-use-case';
import { PopulateDatabaseController } from './populate-database.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('PopulateDatabaseController', () => {
  let controller: PopulateDatabaseController;
  let mockService: DeepMocked<PopulateDatabaseUseCase>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopulateDatabaseController],
      providers: [
        {
          provide: PopulateDatabaseUseCase,
          useValue: createMock<PopulateDatabaseUseCase>(),
        },
      ],
    }).compile();

    controller = module.get(PopulateDatabaseController);
    mockService = module.get(PopulateDatabaseUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(PopulateDatabaseController);
  });

  it('should populate database successfully', () => {
    mockService.execute.mockResolvedValueOnce();

    expect(controller.run()).resolves.not.toThrow();

    expect(mockService.execute).toHaveBeenCalled();
  });

  it('should populate database with error', () => {
    mockService.execute.mockRejectedValueOnce(new Error());

    expect(controller.run()).rejects.toThrow();
  });
});
