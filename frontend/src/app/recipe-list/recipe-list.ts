import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Authservice } from '../services/authservice';
import { IRecipe } from '../models/irecipe';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css']
})
export class RecipeList implements OnInit {

  recipes: IRecipe[] = [];

  currentUserId: string | null = null;

  searchTerm = '';
  selectedCategory = '';
  cookTime: number | null = null;

  constructor(
    private recipeService: RecipeService,
    private authService: Authservice,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserIdFromToken();
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
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  isOwner(recipe: IRecipe): boolean {
    if (!this.currentUserId || !recipe.owner) return false;

    const ownerId =
      typeof recipe.owner === 'string'
        ? recipe.owner
        : recipe.owner._id;

    return ownerId === this.currentUserId;
  }

  deleteRecipe(id?: string): void {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this recipe?')) return;

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(r => r._id !== id);
      },
      error: console.error
    });
  }
}