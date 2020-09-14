import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { GoogleSigninDirective } from './google-signin.directive';
import { EmailLoginComponent } from './email-login/email-login.component';


@NgModule({
  declarations: [GoogleSigninDirective, EmailLoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
