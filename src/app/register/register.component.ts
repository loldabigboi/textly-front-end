import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    private details = {
         email: "",
         username: "",
         password: "",
    }

    private emailTaken: boolean = false;
    private usernameTaken: boolean = false;

    private authenticating: boolean = false;

    constructor( 
        private route: ActivatedRoute,
        private router: Router,
        private registerService: RegisterService,
        private loginService: LoginService
    ) { }

    public submit(form: FormGroup) {

        this.authenticating = true;
        
        this.registerService.registerUser(

            form.value.email,
            form.value.username,
            form.value.password

        ).subscribe((res) => {

            this.loginService.getAuth(form.value.email, form.value.password)
                .subscribe((res: HttpResponse<any>) => {

                    console.log(res);
                    window.localStorage.setItem("access-token", res.body.jwt)
                    
                    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
                    this.router.navigateByUrl(returnUrl ? returnUrl : "/");
                   
                    this.authenticating = false;

                }, (err) => {
                    // shouldn't execute
                    console.log(err);
                })
            
            
        }, (err) => {
            console.log(err);
            if (err.message.includes("email")) {
                this.emailTaken = true;
            }
            if (err.message.includes("username")) {
                this.usernameTaken = true;
            }
        });

    }

    ngOnInit() {

    }

}
