import { Component, OnInit, Input, Output } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {

    @Input() private count = 10;

    private posts: any[] = [];
    private loadingPosts: boolean = true;

    constructor(
        private postService: PostService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {

        this.postService.getPosts(this.count)
            .subscribe((res: any) => {

                console.log(res);
                for (let post of res) {
                    this.userService.getUser(post.authorId)
                        .subscribe((res: any) => {

                            this.posts.push({
                                _id: post._id,
                                title: post.title,
                                body: post.body,
                                author: {
                                    username: res.username,
                                    email: res.email
                                },
                                tags: post.tags,
                                uploadDate: new Date(post.uploadDate)
                            });

                        });
                }
            }, (err) => {   
                console.log(err);
            });

    }

    formatDate(date: Date) {

        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`

    }

}
