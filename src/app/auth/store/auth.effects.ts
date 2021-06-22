import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs'
import * as AuthActions from './auth.actions';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { ExistingUsers } from '../../shared/static-lists/existing-users'

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  accessToken: string,
  foundUser: User
) => {
  // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User({id: id, firstName: firstName, lastName: lastName, email: email, password: password, accessToken: accessToken});
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    accessToken: accessToken
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return of(ExistingUsers.find(x =>x.email === authData.payload.email && x.password === authData.payload.password))
        .pipe(
          map(resData => {
            return handleAuthentication(
              resData.id,
              resData.firstName,
              resData.lastName,
              resData.email,
              resData.password,
              resData.accessToken,
              ExistingUsers.find(x =>x.email === authData.payload.email && x.password === authData.payload.password)
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );
  constructor(
    private actions$: Actions
  ) {}
}
