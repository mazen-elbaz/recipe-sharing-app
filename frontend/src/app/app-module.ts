import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Authinterceptor } from './Services/authinterceptor';
import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  declarations: [App, Login, Register],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
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
