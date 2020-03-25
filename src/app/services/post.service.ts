import { Injectable } from '@angular/core';
import {Post} from '../models/Post.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  emitPost() {
    this.postSubject.next(this.posts.slice());
  }
  constructor() {
    this.getPosts();
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPost();
      });
  }
  createNewPost(newPost: Post) {
    newPost.idPost = this.posts.length;
    this.posts.push(newPost);
    this.savePosts();
    this.emitPost();
  }

  getSinglePost(id: number) {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref('/posts/' +  id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      })
    );
  }
  EditPost(idPost: number, newPost: Post) {

    const postIndexToModify = this.posts.findIndex(
      (postEl: Post) => {
        if ( postEl.idPost === idPost) {
          return true;
        }
      }
    );
    console.log(postIndexToModify);
    newPost.idPost = idPost;
    this.posts.splice(postIndexToModify , 1, newPost) ;

    this.savePosts();

    this.emitPost();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove , 1);
    this.savePosts();
    this.emitPost();
  }

  loveits(post: Post) {
    post.LoveIts++;
    this.savePosts();
    this.emitPost();
  }
  dontloveits(post: Post) {
    post.LoveIts--;
    this.savePosts();
    this.emitPost();
  }
}
