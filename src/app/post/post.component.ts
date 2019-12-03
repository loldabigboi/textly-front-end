import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    private loadingPost: boolean = true;

    private post = {
        title: "Title of the post",
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada non metus in porta. Aliquam erat volutpat. Phasellus porta dignissim nunc eu tristique. Duis nibh elit, maximus ut pretium ut, dignissim quis ipsum. In in metus eget erat finibus convallis ut et dui. Praesent vehicula eleifend placerat. Aliquam condimentum tellus orci, eu bibendum augue facilisis quis. Donec aliquam leo nec lorem vulputate blandit. Aliquam sed luctus justo. Morbi hendrerit leo non sollicitudin volutpat. Duis sagittis congue dui ut commodo. Aliquam bibendum augue est, quis interdum elit condimentum ut.

        Vivamus porta viverra ex, ac blandit erat maximus at. Suspendisse id faucibus urna. Sed venenatis, leo vel pretium blandit, leo dolor fermentum lectus, ut maximus ex nisi ac nisl. Mauris vitae erat dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer turpis elit, dapibus nec maximus at, suscipit nec lectus. Vestibulum et finibus sapien, a suscipit ipsum. Maecenas mollis, ligula ac sollicitudin tristique, quam arcu ullamcorper risus, pharetra pretium leo enim sed dolor. Phasellus elementum gravida fermentum. Cras at felis sit amet magna sagittis hendrerit a eu tortor.
        
        In in scelerisque lorem, varius posuere odio. Pellentesque posuere nunc bibendum, maximus erat sed, pretium felis. Quisque ut felis ac orci interdum auctor nec sed neque. In sed nunc libero. Ut ac venenatis ante. Nulla sit amet tincidunt nisi. Quisque euismod nec nulla sit amet pellentesque. Phasellus vel eros suscipit, vulputate leo a, interdum ipsum. Cras faucibus at arcu id ornare. Pellentesque volutpat lectus et arcu ultrices, vel consectetur ante consequat. Proin faucibus enim non risus ultrices, eu tempor diam ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse eget efficitur velit, vitae malesuada eros.`,
        tags: [ "dummy", "text", "test", "tags" ],
        author: {
            username: "dummy",
            email: "dummy@dummy.com"
        },
        uploadDate: "3/12/2019 2:12PM"
    }

    constructor(
        private router: Router,
        private postService: PostService,
        private userService: UserService,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {

        this.activeRoute.params.subscribe(params => {
            
            const postId = params["id"];
            
            this.postService.getPost(postId)
                .subscribe((res: any) => {

                    console.log(res);
                    this.post.title = res.title;
                    this.post.body = res.body;
                    this.post.tags = res.tags;

                    // get user who posted post
                    this.userService.getUser(res.authorId)
                        .subscribe((res: any) => {

                            this.post.author.username = res.username;
                            this.post.author.email = res.email;
                            this.loadingPost = false;

                        }, (err) => {
                            console.log(err);
                        })

                }, (err) => {

                    // post does not exist
                    console.log(err);
                    this.loadingPost = false;
                    this.router.navigateByUrl("/not-found");

                });



        });

    }

}
