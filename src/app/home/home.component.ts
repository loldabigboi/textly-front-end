import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private postsLoaded: boolean = false;

    constructor(
        private router: Router
    ) { }

    onSubmit(form: NgForm) {

        const formGroup: FormGroup = form.form;
        const postId = formGroup.value.postId;

        this.router.navigateByUrl("/posts/" + postId);

    }

    ngOnInit() {
    }

}
