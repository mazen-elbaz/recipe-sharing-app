import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { IRecipe } from '../models/irecipe';

@Component({
  selector: 'app-my-recipes',
  standalone: false,
  templateUrl: './my-recipes.html',
  styleUrls: ['./my-recipes.css']
})
export class MyRecipes implements OnInit {

  recipes: IRecipe[] = [];

  constructor(private recipeService: RecipeService, private CI: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.recipeService.getMyRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.CI.detectChanges();
      }
    });
  }
}
