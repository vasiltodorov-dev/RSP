import { Module } from '@nestjs/common';
import { DietaryPreferencesService } from './dietary_preferences.service';
import { DietaryPreferencesController } from './dietary_preferences.controller';

@Module({
  controllers: [DietaryPreferencesController],
  providers: [DietaryPreferencesService],
})
export class DietaryPreferencesModule {}
