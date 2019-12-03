import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Location } from "@angular/common";
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private login = {
         email: "",
         password: ""
    }

    private authenticating: boolean = false;

    constructor( 
        private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router ) {

    }

    public submit(form: FormGroup) {
        
        this.authenticating = true;
        console.log(form);

        const auth = this.loginService.getAuth(
            form.value.email,
            form.value.password
        );

        auth.subscribe((res: HttpResponse<any>) => {

            console.log("login success");
            window.localStorage.setItem("access-token", res.body.jwt);
            this.authenticating = false;

            const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
            this.router.navigateByUrl(returnUrl);
            
        }, (err) => { 
            form.setErrors({ "valid": false });
            console.log(err);
            this.authenticating = false; 
        });

    }

    ngOnInit() {

    }

}
