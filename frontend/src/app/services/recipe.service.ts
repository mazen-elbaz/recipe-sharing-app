import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from '../models/irecipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    private apiUrl = 'http://localhost:5000/api/recipes';
    constructor(private http: HttpClient) { }
    getAllRecipes(): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>(this.apiUrl);
    }
    
    getRecipeById(id: string): Observable<IRecipe> {
        return this.http.get<IRecipe>(`${this.apiUrl}/${id}`);
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
