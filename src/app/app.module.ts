import { environment } from "../environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { LoginPageComponent } from './core/layouts/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginFormComponent } from './core/components/login-form/login-form.component';
import { DashboardPageComponent } from './core/layouts/dashboard-page/dashboard-page.component';
import { TimetablePageComponent } from './core/layouts/timetable-page/timetable-page.component';
import { SettingsPageComponent } from './core/layouts/settings-page/settings-page.component';
import { SignupFormComponent } from './core/components/signup-form/signup-form.component';
//Libraries für Firebase importieren
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ForumComponent } from './core/components/forum/forum.component';
import { CrudService } from "./shared/services/crud.service";
import { PostDialogComponent } from './shared/components/post-dialog/post-dialog.component';
import { ContentViewerComponent } from './core/components/content-viewer/content-viewer.component';
import { TopNavComponent } from './shared/components/top-nav/top-nav.component';
import { CardWrapComponent } from './shared/components/card-wrap/card-wrap.component';
import { TopicNavComponent } from './core/components/topic-nav/topic-nav.component';
import { ImageViewerComponent } from './shared/components/image-viewer/image-viewer.component';
import { PostNavComponent } from './shared/components/post-nav/post-nav.component';



const ExtraModules = [
  MaterialModule,
  ReactiveFormsModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    DashboardPageComponent,
    TimetablePageComponent,
    SettingsPageComponent,
    SignupFormComponent,
    ForumComponent,
    PostDialogComponent,
    ContentViewerComponent,
    TopNavComponent,
    CardWrapComponent,
    TopicNavComponent,
    ImageViewerComponent,
    PostNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ExtraModules
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
