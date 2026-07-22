import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RECIPE_CATEGORIES } from '../constants/recipe-categories';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

const commaSeparatedListValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string | null;
  if (!value) {
    return { required: true };
  }

  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return items.length > 0 ? null : { required: true };
};

@Component({
  selector: 'app-recipe-form',
  standalone: false,
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm {
  recipeForm!: FormGroup;
  categories = RECIPE_CATEGORIES;

  isEditMode = false;
  recipeId: string | null = null;
  isSubmitting = false;
  formError = '';

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      description: [''],
      ingredients: ['', [commaSeparatedListValidator]],
      steps: ['', [commaSeparatedListValidator]],
      category: ['', [Validators.required]],
      cookTime: [null, [Validators.min(0)]],
      imageUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    });

    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.recipeId;

    if (this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (recipe) => {
          this.recipeForm.patchValue({
            title: recipe.title,
            description: recipe.description ?? '',
            ingredients: recipe.ingredients?.join(', ') ?? '',
            steps: recipe.steps?.join(', ') ?? '',
            category: recipe.category,
            cookTime: recipe.cookTime ?? null,
            imageUrl: recipe.imageUrl ?? '',
          });
        },
        error: () => {
          this.formError = 'Unable to load recipe for editing.';
        },
      });
    }
  }

  get titleText(): string {
    return this.isEditMode ? 'Edit Recipe' : 'Create Recipe';
  }

  get submitText(): string {
    if (this.isSubmitting) {
      return this.isEditMode ? 'Saving...' : 'Creating...';
    }
    return this.isEditMode ? 'Save Changes' : 'Save Recipe';
  }

  private parseList(value: string): string[] {
    return value
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
  }

  onSubmit() {
    this.formError = '';

    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const recipeData = {
      title: this.recipeForm.value.title,
      description: this.recipeForm.value.description,
      ingredients: this.parseList(this.recipeForm.value.ingredients),
      steps: this.parseList(this.recipeForm.value.steps),
      category: this.recipeForm.value.category,
      cookTime: this.recipeForm.value.cookTime,
      imageUrl: this.recipeForm.value.imageUrl,
    };

    this.isSubmitting = true;

    if (this.isEditMode && this.recipeId) {
      this.recipeService.updateRecipe(this.recipeId, recipeData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.formError = error?.error?.error || 'Failed to update recipe. Please try again.';
        },
      });
      return;
    }

    this.recipeService.createRecipe(recipeData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.recipeForm.reset();
        this.recipeForm.markAsPristine();
        this.recipeForm.markAsUntouched();
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.formError = error?.error?.error || 'Failed to create recipe. Please try again.';
      },
    });
  }
}
