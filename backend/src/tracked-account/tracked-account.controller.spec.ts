import { Test, TestingModule } from '@nestjs/testing';
import { TrackedAccountController } from './tracked-account.controller';

describe('TrackedAccount Controller', () => {
  let controller: TrackedAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackedAccountController],
    }).compile();

    controller = module.get<TrackedAccountController>(TrackedAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
