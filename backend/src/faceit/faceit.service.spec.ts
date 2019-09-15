import { Test, TestingModule } from '@nestjs/testing';
import { FaceitService } from './faceit.service';

describe('FaceitService', () => {
  let service: FaceitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaceitService],
    }).compile();

    service = module.get<FaceitService>(FaceitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
