import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { EmailLoginComponent } from './email-login/email-login.component';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [ EmailLoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ɵInternalFormsSharedModule
  ]
})
export class UserModule { }
