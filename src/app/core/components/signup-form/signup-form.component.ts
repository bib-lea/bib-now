import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', []),
      passwordReenter: new FormControl('', []),
    });
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }
}
