import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../models/Post.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: Post;
  constructor(private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.post = new Post('', '', 0,  '');
    const id = this.route.snapshot.params.id;
    this.postService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;
      }
    );

  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const content = form.value.content;
    const createdAt = Date.now().toString();
    const loveIts = this.post.LoveIts;
    const newPost = new Post(title, content, loveIts, createdAt);
    const id = this.post.idPost;
    this.postService.EditPost(id, newPost);

    this.router.navigate(['/posts']).then(
      () => {
        console.log('le post a été modifie');
      }
    );
  }
}
