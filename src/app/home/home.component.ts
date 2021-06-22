import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalService } from '../modals/modal.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngIfModalId = 'ngIfModal'
  progromaticModalId = 'progromaticModalId'
  currentUser: any
  private subs = new Subscription()
  constructor(
    private userService: UserService,
    private storage: LocalStorageService,
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.subToCurrentUser()
  }

  subToCurrentUser() {
    this.subs.add(
      this.userService.currentUser.subscribe(user => {
        if (user) {
          this.currentUser = user
        } else {
          this.currentUser = null
        }
      })
    )
  }

  openNgIfModal() {
    this.modalService.open(this.ngIfModalId)
  }

  setUserLoggedIn(event: any) {
    if (event) {
      this.modalService.close(this.ngIfModalId)
      this.currentUser = this.userService.currentUserValue
    }
  }

  logoutUser() {
    this.userService.removeCurrentUser()
  }

  closeModals() {
    this.modalService.close(this.ngIfModalId)
  }

}
