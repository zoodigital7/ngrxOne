import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginEmailComponent } from './login-email/login-email.component';
import { SignupEmailComponent } from './signup-email/signup-email.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [
    LoginEmailComponent,
    SignupEmailComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports: [
    LoginEmailComponent,
    SignupEmailComponent
  ]
})
export class AuthModule { }
