import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CreateCuisineDto } from './dto/create-cuisine.dto';
import { UpdateCuisineDto } from './dto/update-cuisine.dto';

@Controller('cuisine')
export class CuisineController {
  constructor(private readonly cuisineService: CuisineService) {}

  @Post()
  create(@Body() createCuisineDto: CreateCuisineDto) {
    return this.cuisineService.create(createCuisineDto);
  }

  @Get()
  findAll() {
    return this.cuisineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    //return this.ingredientService.findOne(+id);
        const couisine = await this.cuisineService.findOne(+id);
        if (!couisine) {
          
          throw new NotFoundException(`Recipe with ID ${id} does not exist`);
        }
          
        return couisine;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuisineDto: UpdateCuisineDto) {
    return this.cuisineService.update(+id, updateCuisineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuisineService.remove(+id);
  }
}
