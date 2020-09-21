import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../../../shared/services/auth-service.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  @Output() formState = new EventEmitter<string>();

  reenter: boolean = false;
  signupForm: FormGroup;
  authPromise: Promise<void>;

  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [''],
      password: [''],
      reenter: ['']
    });
  }

  onBack(): void {
    this.formState.emit('');
  }

  onSubmit(): void {
    let { email, password } = this.signupForm.value;
    email += '@edu.bib.de';
    console.log(email);
    this.authService.onSignUp(email, password);
  }
}
