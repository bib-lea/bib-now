import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './shared/modules/firebase/firebase.module';
import { MaterialModule } from './shared/modules/material/material.module';
import { LoginPageComponent } from './core/layouts/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

const ExtraModules = [
  FirebaseModule,
  MaterialModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ExtraModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
