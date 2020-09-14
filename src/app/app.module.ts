import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './shared/modules/firebase/firebase.module';
import { MaterialModule } from './shared/modules/material/material.module';
import { LoginPageComponent } from './core/layouts/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginFormComponent } from './core/components/login-form/login-form.component';
import { DashboardPageComponent } from './core/layouts/dashboard-page/dashboard-page.component';

const ExtraModules = [
  FirebaseModule,
  MaterialModule,
  ReactiveFormsModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    DashboardPageComponent
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
