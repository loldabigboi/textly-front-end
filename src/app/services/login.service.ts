import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private jwt: string;

    constructor(private http: HttpClient) {

    }

    public getAuth(email: string, password: string) {

        return this.http.post("http://localhost:3000/api/auth", {
            email: email,
            password: password
        }, { observe: "response" });

    }

    public isLoggedIn() {

        const helper = new JwtHelperService();
        const token = localStorage.getItem("access-token");
        return token && !helper.isTokenExpired(token);

    }

    public logout() {
        window.localStorage.removeItem("access-token");
    }

    public getLoggedInUser() {

        const helper = new JwtHelperService();
        return helper.decodeToken(window.localStorage.getItem("access-token"));

    }
    
}
