import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DietaryPreferencesService } from './dietary_preferences.service';
import { CreateDietaryPreferenceDto } from './dto/create-dietary_preference.dto';
import { UpdateDietaryPreferenceDto } from './dto/update-dietary_preference.dto';

@Controller('dietary-preferences')
export class DietaryPreferencesController {
  constructor(private readonly dietaryPreferencesService: DietaryPreferencesService) {}

  @Post()
  create(@Body() createDietaryPreferenceDto: CreateDietaryPreferenceDto) {
    return this.dietaryPreferencesService.create(createDietaryPreferenceDto);
  }

  @Get()
  findAll() {
    return this.dietaryPreferencesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    //return this.ingredientService.findOne(+id);
    const dietaryPreference = await this.dietaryPreferencesService.findOne(+id);
    if (!dietaryPreference) {
      
      throw new NotFoundException(`Dietary Preference with ID ${id} does not exist`);
    }
      
    return dietaryPreference;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDietaryPreferenceDto: UpdateDietaryPreferenceDto) {
    return this.dietaryPreferencesService.update(+id, updateDietaryPreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietaryPreferencesService.remove(+id);
  }
}
