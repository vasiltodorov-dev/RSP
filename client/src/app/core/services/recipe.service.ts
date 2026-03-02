// src/app/core/services/recipe.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe, CreateRecipeRequest } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/recipe';

  // 1. Get Recipes with Search Filters
  getRecipes(filters?: { ingredients?: string; cuisine?: string; dietary?: string }) {
    let params = new HttpParams();

    if (filters) {
      if (filters.ingredients) params = params.set('ingredients', filters.ingredients);
      if (filters.cuisine) params = params.set('cuisine', filters.cuisine);
      if (filters.dietary) params = params.set('dietary', filters.dietary);
    }

    return this.http.get<Recipe[]>(this.API_URL, { params });
  }

  // 2. Submit a New Recipe
  createRecipe(recipeData: CreateRecipeRequest) {
    return this.http.post<Recipe>(this.API_URL, recipeData);
  }

  // 3. Get a single recipe by ID
  getRecipeById(id: string) {
    return this.http.get<Recipe>(`${this.API_URL}/${id}`);
  }
}