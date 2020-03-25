import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Router} from '@angular/router';
import {Post} from '../models/Post.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postsSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPost();
  }

  onCreatePost() {
    this.router.navigate(['/newpost']);
  }
  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
