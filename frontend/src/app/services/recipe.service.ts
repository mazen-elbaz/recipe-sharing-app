import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from '../models/irecipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:5000/api/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(
    search?: string,
    category?: string,
    cookTime?: number | null
  ): Observable<IRecipe[]> {

    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (category) {
      params = params.set('category', category);
    }

    if (cookTime) {
      params = params.set('cookTime', cookTime);
    }

    return this.http.get<IRecipe[]>(this.apiUrl, { params });
  }


  getRecipeById(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${this.apiUrl}/${id}`);
  }


  getMyRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${this.apiUrl}/mine`);
  }


  createRecipe(recipe: Partial<IRecipe>): Observable<IRecipe> {
    return this.http.post<IRecipe>(this.apiUrl, recipe);
  }


  updateRecipe(id: string, recipe: Partial<IRecipe>): Observable<IRecipe> {
    return this.http.put<IRecipe>(`${this.apiUrl}/${id}`, recipe);
  }


  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}