import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepository: Repository<RecipeIngredient>,

    private dataSource: DataSource, // Used for transactions
  ) {}
  async create(createRecipeDto: CreateRecipeDto, userId: number) {
    const { ingredientData, cuisineId, dietaryPreferenceIds, ...recipeDetails } = createRecipeDto;

    // We use a queryRunner to make sure everything succeeds or everything fails together
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Create the Recipe Instance
      const recipe = queryRunner.manager.create(Recipe, {
        ...recipeDetails,
        author: { id: userId }, // Link the author from JWT
        cuisine: { id: cuisineId }, // Link the Cuisine
        dietaryPreferences: dietaryPreferenceIds?.map(id => ({ id })), // Link Many-to-Many
      });

      const savedRecipe = await queryRunner.manager.save(recipe);
      // 2. Handle the Ingredients with Amounts
      if (ingredientData && ingredientData.length > 0) {
        const recipeIngredients = ingredientData.map((item: any) => {
          return queryRunner.manager.create(RecipeIngredient, {
            recipeId: savedRecipe.id,
            ingredientId: item.ingredientId,
            amount: item.amount,
          });
        });

        await queryRunner.manager.save(recipeIngredients);
      }
      await queryRunner.commitTransaction();
      return savedRecipe;

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return `This action adds a new recipe with authorID #${userId}`;
  }

  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
