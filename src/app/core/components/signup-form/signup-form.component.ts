import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  @Output() isSignup = new EventEmitter<boolean>();

  signupForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', []),
      passwordReenter: new FormControl('', []),
    });
  }

  onBack(): void {
    this.isSignup.emit(false);
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }
}
