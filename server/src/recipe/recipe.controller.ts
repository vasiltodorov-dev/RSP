import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, Query, NotFoundException, ForbiddenException } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import your guard
import {AdminGuard} from '../auth/roles.guard';

@Controller('recipe')
@UseGuards(JwtAuthGuard)
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @Request() req) {
    // req.user is populated by the Guard from the JWT
    const userId = req.user.userId; 
    console.log('User ID from Token:', userId);
    
    return this.recipeService.create(createRecipeDto, userId);
  }

  @Get()
  findAll(
    @Query('cuisineId') cuisineId?: number,
    @Query('ingredientId') ingredientId?: number,
    @Query('dietaryId') dietaryId?: number,
  ) {
    return this.recipeService.findAll({ cuisineId, ingredientId, dietaryId });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recipe = await this.recipeService.findOne(+id);
    if (!recipe) {
      // This is where we get "loud" for the frontend
      throw new NotFoundException(`Recipe with ID ${id} does not exist`);
    }
  
    return recipe;
  }

  @Patch(':id')
@UseGuards(JwtAuthGuard)
async update(
  @Param('id') id: string, 
  @Body() updateRecipeDto: UpdateRecipeDto, 
  @Request() req
) {
  const loggedInUserId = req.user.userId;
  const recipeId = +id;

  // 1. We MUST fetch the recipe first to see who the author is
  const recipe = await this.recipeService.findOne(recipeId);

  // 2. The Guard Check: Compare logged-in ID with the recipe's author ID
  if (recipe!.author.id !== loggedInUserId) {
    throw new ForbiddenException('You are not allowed to edit someone else’s recipe!');
  }

  // 3. If check passes, proceed to the service
  return this.recipeService.update(recipeId, updateRecipeDto);
}

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
