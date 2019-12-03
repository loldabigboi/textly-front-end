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
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard.service';
import { PostService } from './services/post.service';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './services/register.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        NotFoundComponent,
        AboutComponent,
        SupportComponent,
        CreateComponent,
        LoginComponent,
        PostComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: "about", component: AboutComponent },
            { path: "support", component: SupportComponent },
            { 
                path: "create", 
                component: CreateComponent, 
                canActivate: [ AuthGuard ]
            },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: "posts/:id", component: PostComponent },
            { path: "", component: HomeComponent },
            { path: "**", component: NotFoundComponent }
        ]),
        FormsModule,
        HttpClientModule
    ],
    providers: [ 
        LoginService,
        PostService,
        RegisterService,
        AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
