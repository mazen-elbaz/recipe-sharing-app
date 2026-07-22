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
  
  constructor(private recipeService: RecipeService, private CI:ChangeDetectorRef) {}
  ngOnInit(): void {
  console.log("ngOnInit");

  this.recipeService.getAllRecipes().subscribe({
    next: (data) => {
      this.recipes = data;
      this.CI.detectChanges();
    }
  });
}
}