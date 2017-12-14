import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import Components from './components';
import Modules from './modules';
import Services from './services';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {PipeModule} from "./modules/pipe/pipe.module";


export const app = {
    declarations: [
      AppComponent,

    ]
     .concat(Components),
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
        PipeModule
    ].concat(Modules),
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:true
      },

    ].concat(Services),
    bootstrap: [AppComponent],
  };
@NgModule(app)
export class AppModule { }
