import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Authinterceptor } from './interceptor/authinterceptor';
import { Login } from './login/login';
import { Register } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeForm } from './recipe-form/recipe-form';
import { RecipeList } from './recipe-list/recipe-list';
import { Home } from './home/home';
import { MyRecipes } from './my-recipes/my-recipes';

@NgModule({
  declarations: [App, Login, Register, RecipeForm, RecipeList, Home, MyRecipes],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: Authinterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
