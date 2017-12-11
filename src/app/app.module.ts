import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import Components from './components';
import Modules from './modules';
import Services from './services';
import {SplitWordByCapitalizedPipe} from "./pipes/split-word-by-capitalized.pipe";
import {CapitalizePipe} from "./pipes/capitalize.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";

export const app = {
    declarations: [
      AppComponent,
      CapitalizePipe,
      SplitWordByCapitalizedPipe
    ].concat(Components),
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
    ].concat(Modules),
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:true
      },

    ].concat(Services),
    bootstrap: [AppComponent]
  };
@NgModule(app)
export class AppModule { }
