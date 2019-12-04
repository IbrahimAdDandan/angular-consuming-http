import { NotFoundError } from './common/not-found-error';
import { BadInputError } from './common/bad-input-error';
import { AppError } from './common/app-error';
import { Post } from './common/models/post';
import { PostService } from './services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[];

  constructor(private service: PostService) {
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(posts => this.posts = posts);

    // .subscribe(posts => console.log(JSON.stringify(posts, null, 2)));
  }

  createPost(input: HTMLInputElement) {
    let post = new Post();
    post.title = input.value;
    input.value = '';

    this.service.create(post)
      .subscribe(
        newPost => {
          post.id = newPost.id;
            this.posts.splice(0, 0, post);
          },
          (error: AppError) => {
            if (error instanceof BadInputError) {
              // this.form.setErrors(error.originalError);
            }
            else throw error;
          });
  }

  updatePost(post) {
    this.service.update(post)
      .subscribe(
        updatedPost => {
          console.log(updatedPost);
        });
  }

  deletePost(post) {
    this.service.delete(post.id)
      .subscribe(
        () => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else throw error;
        });
  }
}
