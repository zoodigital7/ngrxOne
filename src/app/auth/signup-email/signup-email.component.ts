import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-signup-email',
  templateUrl: './signup-email.component.html',
  styleUrls: ['./signup-email.component.scss']
})
export class SignupEmailComponent implements OnInit, OnDestroy {
  form: FormGroup
  formValues: any
  submitting = false
  hasError = false
  errorMsg: string
  private subs = new Subscription()
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createFormControls()
    this.createForm()
  }

  createFormControls() {
    this.formValues = {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    }
  }

  createForm() {
    this.form = this.fb.group(this.formValues, { validator: MustMatch('password', 'passwordConfirmation') })
  }

  // convenience getter for form controls
  get f() {
    if (this.form && this.form.controls) {
      return this.form.controls
    }
  }

  signupUser() {
    if (this.form && this.form.invalid) {
      this.submitting = false
      this.hasError = true
      return
    }
    const form = this.form.value
    const params = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password
    }
    this.subs.add(
      this.userService.registerUser(params).subscribe(data => {
        debugger
        if (data.success && data.user) {
          const newUser = data.user
          this.router.navigate(['/home'])
        }
      })
    )
  }

  routeToLogin() {
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
