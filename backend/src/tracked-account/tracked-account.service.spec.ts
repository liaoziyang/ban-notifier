import { Test, TestingModule } from '@nestjs/testing';
import { TrackedAccountService } from './tracked-account.service';

describe('TrackedAccountService', () => {
  let service: TrackedAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackedAccountService],
    }).compile();

    service = module.get<TrackedAccountService>(TrackedAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
