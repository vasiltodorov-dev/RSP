import { Injectable } from '@nestjs/common';
import { CreateDietaryPreferenceDto } from './dto/create-dietary_preference.dto';
import { UpdateDietaryPreferenceDto } from './dto/update-dietary_preference.dto';

@Injectable()
export class DietaryPreferencesService {
  create(createDietaryPreferenceDto: CreateDietaryPreferenceDto) {
    return 'This action adds a new dietaryPreference';
  }

  findAll() {
    return `This action returns all dietaryPreferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dietaryPreference`;
  }

  update(id: number, updateDietaryPreferenceDto: UpdateDietaryPreferenceDto) {
    return `This action updates a #${id} dietaryPreference`;
  }

  remove(id: number) {
    return `This action removes a #${id} dietaryPreference`;
  }
}
