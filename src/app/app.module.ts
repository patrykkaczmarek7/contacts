import { DetailsDashboardComponent } from './details-dashboard/details-dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

export const appRouters: Routes = [
  {path: 'details', component: DetailsDashboardComponent},
  {path: 'contacts', component: ContactsDashboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactsDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouters)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
