import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { ExistingUsers } from '../static-lists/existing-users'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>
  public currentUser: Observable<any>
  public existingUsers: User[] = []
  constructor(
    private storage: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.storage.getItem('currentUser'))
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

  loginUser(user: any) {
    this.setCurrentUser(user)
    return of(user)
  }

  registerUser(user: any) {
    const newUser = new User(user)
    this.existingUsers.push(newUser)
    return of({ success: true, user: newUser})
  }

}
