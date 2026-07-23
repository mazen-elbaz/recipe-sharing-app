import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecipeService } from '../services/recipe.service';
import { Authservice } from '../services/authservice';
import { IRecipe } from '../models/irecipe';



@Component({
  selector: 'app-recipe-details',
  standalone: false,
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit {
  recipe: IRecipe | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: Authservice,
    private location: Location,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchRecipeDetails(id);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Invalid recipe ID provided.';
    }
  }

  fetchRecipeDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.recipeService.getRecipeById(id).subscribe({
      next: (data) => {
        console.log('Recipe loaded:',data);
        this.recipe = data;
        this.isLoading = false;
        this.checkOwnership();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching recipe details:', err);
        this.errorMessage = 'Failed to load recipe details. Please try again later.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  checkOwnership(): void {
    const currentUserId = this.authService.getUserIdFromToken();
    if (currentUserId && this.recipe && this.recipe.owner) {
      this.isOwner = (currentUserId === this.recipe.owner._id);
    } else {
      this.isOwner = false;
    }
  }

  goBack(): void {
    this.location.back();
  }

  onEdit(): void {
    if (this.recipe && this.isOwner && this.recipe._id) {
      this.router.navigate(['/recipes/edit', this.recipe._id]);
    }
  }

  onDelete(): void {
    if (this.recipe && this.isOwner && this.recipe._id && confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipe._id).subscribe({
        next: () => {
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          console.error('Error deleting recipe:', err);
          alert('Could not delete the recipe. Please try again.');
        }
      });
    }
  }
}


