import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModalsComponent } from './modals/modals.component';
import { ModalsModule } from './modals/modals.module';
import { ProgrommaticModalComponent } from './progrommatic-modal/progrommatic-modal.component';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';
import { LoginEmailComponent } from './auth/login-email/login-email.component';
import { SignupEmailComponent } from './auth/signup-email/signup-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ProgrommaticModalComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AuthModule,
    StoreModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
