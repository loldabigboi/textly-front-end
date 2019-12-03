import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    constructor(
        private postService: PostService,
        private router: Router
    ) { }

    onSubmit(form: NgForm) {

        const formGroup: FormGroup = form.form;
        
        console.log("Title:", formGroup.value.title);
        console.log("Body:", formGroup.value.body);
        console.log("Tags:", formGroup.value.tags.split(" "));

        let tagsString: string = formGroup.value.tags.trim();
        let tags: string[];
        if (tagsString.length === 0) {  // to prevent empty string causing non-empty tag array
            tags = [];
        } else {
            tags = tagsString.split(" ");
        }

        this.postService.createPost(
            formGroup.value.title,
            formGroup.value.body,
            tags
        )
            .subscribe((res: any) => {
                
                this.router.navigateByUrl("/posts/" + res._id, );
                console.log(res);

            }, (err) => {
                console.log(err);
            });

    }

    ngOnInit() {

        // causes tags text area to resize dynamically to fit contents
        // taken from https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize/5346855#5346855

        const onInput = function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        }

        var tx = document.getElementById('tagsInput');
        tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');
        tx.addEventListener("input", onInput, false);

    }

}
