import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogiinComponent } from './logiin/logiin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogiinComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ModalModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LocalStorageModule.withConfig({
        prefix: 'angApp',
        storageType: 'localStorage'
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
