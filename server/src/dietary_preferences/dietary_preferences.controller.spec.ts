import { Test, TestingModule } from '@nestjs/testing';
import { DietaryPreferencesController } from './dietary_preferences.controller';
import { DietaryPreferencesService } from './dietary_preferences.service';

describe('DietaryPreferencesController', () => {
  let controller: DietaryPreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietaryPreferencesController],
      providers: [DietaryPreferencesService],
    }).compile();

    controller = module.get<DietaryPreferencesController>(DietaryPreferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
