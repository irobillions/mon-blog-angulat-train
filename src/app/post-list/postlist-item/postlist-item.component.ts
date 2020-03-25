import { Component, OnInit,Input } from '@angular/core';
import {Post} from '../../models/Post.model';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-postlist-item',
  templateUrl: './postlist-item.component.html',
  styleUrls: ['./postlist-item.component.scss']
})
export class PostlistItemComponent implements OnInit {

  @Input() post: Post;
  @Input() indexOfPost: number;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }
  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }

  onViewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  onLoveIt(post: Post) {
    this.postService.loveits(post);
  }

  onDontLoveIt(post: Post) {
    this.postService.dontloveits(post);
  }
}
