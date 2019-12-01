import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { SupportComponent } from './support/support.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    SupportComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        { path: "about", component: AboutComponent },
        { path: "support", component: SupportComponent },
        { path: "create", component: CreateComponent },
        { path: "", component: HomeComponent },
        { path: "**", component: NotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
