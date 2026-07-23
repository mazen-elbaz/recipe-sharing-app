import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeForm } from './recipe-form/recipe-form';
import { Home } from './home/home';
import { Authguard } from './guard/authguard';
import { RecipeDetails } from './recipe-details/recipe-details';

import { MyRecipes } from './my-recipes/my-recipes';

const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register},
  { path: 'recipes',component: RecipeList},
  { path: 'recipes/mine', component: MyRecipes, canActivate: [Authguard] },
  { path: 'recipes/create', component: RecipeForm, canActivate: [Authguard] },
  { path: 'recipes/edit/:id', component: RecipeForm, canActivate: [Authguard] },
  {path:'recipes/:id',component:RecipeDetails},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
