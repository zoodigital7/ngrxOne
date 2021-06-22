import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { ExistingUsers } from '../static-lists/existing-users'
// ngrx imports
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>
  public existingUsers: User[] = []
  constructor(
    // private store: Store<fromApp.AppState>,
    private storage: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.storage.getItem('currentUser'))
    this.currentUser = this.currentUserSubject.asObservable()
    this.existingUsers = ExistingUsers
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  setCurrentUser(user: any) {
    this.storage.setItem('currentUser', user)
    this.currentUserSubject.next(user)
  }

  removeCurrentUser() {
    this.storage.setItem('currentUser', undefined)
    this.storage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }

  loginUser(params: any) {
    const foundUser = this.existingUsers.find(x => x.email === params.email && x.password === params.password)
    if (foundUser) {
      this.setCurrentUser(foundUser)
      return of(foundUser)
    } else {
      return of(null)
    }
  }

  registerUser(user: any) {
    const newUser = new User(user)
    this.existingUsers.push(newUser)
    this.setCurrentUser(user)
    return of({ success: true, user: newUser})
  }

}
