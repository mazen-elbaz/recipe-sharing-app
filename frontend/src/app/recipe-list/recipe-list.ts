import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { IRecipe } from '../models/irecipe';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css']
})
export class RecipeList implements OnInit {

  recipes: IRecipe[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  cookTime: number | null = null;

  constructor(
    private recipeService: RecipeService,
    private CI: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchRecipes();
  }


  searchRecipes(): void {

    this.recipeService.getAllRecipes(
      this.searchTerm,
      this.selectedCategory,
      this.cookTime
    ).subscribe({
      next: (data) => {
        this.recipes = data;
        this.CI.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}