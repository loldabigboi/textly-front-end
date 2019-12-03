import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    constructor(
        private http: HttpClient
    ) { }

    public registerUser(email: string, username: string, password: string) {

        return this.http.post("http://localhost:3000/api/users", {
            email: email,
            username: username,
            password: password
        });

    }

}
