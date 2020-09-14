import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { GoogleSigninDirective } from './google-signin.directive';


@NgModule({
  declarations: [GoogleSigninDirective],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
