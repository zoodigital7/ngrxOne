import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { ExistingUsers } from '../../shared/static-lists/existing-users';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {
  email: string
  password: string
  submitting = false
  hasError = false
  errorMsg: string
  existingUsers = ExistingUsers
  userLoggedIn: EventEmitter<any> = new EventEmitter()
  private subs = new Subscription()
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.hasError = false
    this.submitting = true
    const email = this.email
    const pass = this.password
    if (email && email !== '' && pass && pass !== '') {
      this.submitForm(email, pass)
    } else {
      this.hasError = true
    }
  }

  submitForm(email: string, pass: string) {
    const params = { email: email, password: pass}
    this.subs.add(
      this.userService.loginUser(params).subscribe(user => {
        if (user) {
          this.userLoggedIn.emit(true)
          this.router.navigate(['home'])
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
