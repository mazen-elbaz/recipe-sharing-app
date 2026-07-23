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
  currentUserId: string | null=null;
  
  constructor(private recipeService: RecipeService,private authService:Authservice, private CI:ChangeDetectorRef) {}
 
ngOnInit(): void {
  console.log("ngOnInit");

  
  this.currentUserId = this.authService.getUserIdFromToken();
  console.log("Current User ID fetched in ngOnInit:", this.currentUserId);

  
  this.recipeService.getAllRecipes().subscribe({
    next: (data) => {
      this.recipes = data;
      this.CI.detectChanges(); 
    },
    error: (err) => console.error('Error fetching recipes:', err)
  });
}






isOwner(recipe: IRecipe): boolean {
  if (!this.currentUserId || !recipe || !recipe.owner) return false;


  const ownerId = typeof recipe.owner === 'string'
    ? recipe.owner
    : (recipe.owner._id || (recipe.owner as any).id);


  if (!ownerId) return false;


  return String(this.currentUserId).trim() === String(ownerId).trim();
}



deleteRecipe(id: string | undefined): void {
  if (!id) return;

  if (confirm('Are you sure you want to delete this recipe?')) {
    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(recipe => recipe._id !== id);
        this.CI.detectChanges();
      },
      error: (err) => {
        console.error('Error deleting recipe:', err);
        alert('Failed to delete the recipe.');
      }
    });
  }
}

}