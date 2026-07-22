import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
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

@NgModule({
  declarations: [App, Login, Register, RecipeForm, RecipeList, Home],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
