import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
;

@Injectable({
  providedIn: 'root'
})
export class PostService {

    constructor(
        private http: HttpClient
    ) { }

    createPost(title: string, body: string, tags: string[]) {

        const token = window.localStorage.getItem("access-token");
        const user = (new JwtHelperService).decodeToken(token);

        return this.http.post("http://localhost:3000/api/posts", {
            title: title,
            body: body,
            tags: tags
        }, { headers: { "x-auth-token": token } });

    }

    getPost(postId: string) {

        return this.http.get("http://localhost:3000/api/posts/" + postId);

    }

}
