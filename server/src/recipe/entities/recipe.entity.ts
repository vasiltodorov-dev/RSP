// src/recipes/entities/recipe.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Cuisine } from '../../cuisine/entities/cuisine.entity';
import { DietaryPreference } from '../../dietary_preferences/entities/dietary_preference.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  instructions: string;

  // 1. Recipe -> User (Many-to-One)
  @ManyToOne(() => User, (user) => user.recipes)
  author: User;

  // 2. Recipe -> Cuisine (Many-to-One)
  @ManyToOne(() => Cuisine, (cuisine) => cuisine.recipes)
  cuisine: Cuisine;

  // 3. Recipe -> DietaryPreference (Many-to-Many)
  @ManyToMany(() => DietaryPreference)
  @JoinTable() // This creates the automatic join table for you
  dietaryPreferences: DietaryPreference[];

  // 4. Recipe -> RecipeIngredient (One-to-Many)
  // This connects to our custom join table to get the 'amount'
  @OneToMany(() => RecipeIngredient, (ri) => ri.recipe)
  recipeIngredients: RecipeIngredient[];
}