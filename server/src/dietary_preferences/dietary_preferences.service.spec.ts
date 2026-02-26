import { Test, TestingModule } from '@nestjs/testing';
import { DietaryPreferencesService } from './dietary_preferences.service';

describe('DietaryPreferencesService', () => {
  let service: DietaryPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietaryPreferencesService],
    }).compile();

    service = module.get<DietaryPreferencesService>(DietaryPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
