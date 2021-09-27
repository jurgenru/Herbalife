import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ArticleService } from 'src/app/services/article.service';
import { CommentaryService } from 'src/app/services/commentary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  article: any = {};
  content: any;
  comments: any = [];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private spinner: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commentaryService: CommentaryService
  ) {
    this.get();
  }

  ngOnInit() {
    this.createComment();
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.articleService.getById(val.id).subscribe(data => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.article = data;
          this.getComments();
          this.spinner.stop();
        }, elapsed);
      });
    });
  }

  createComment() {
    this.content = this.formBuilder.group({
      comment: ["", Validators.required]
    });
  }


  get comment() {
    return this.content.get("comment");
  }

  getComments() {
    const filter = `{"fields": {"id": true, "content": true, "comment": true, "userId": true, "created": true}, "order":["id DESC"]}`;
    this.articleService.getCommentaryById(this.article.id, filter).subscribe((comen: any) => {
      comen.forEach(element => {
        this.userService.getProfileById(element.userId).subscribe((pro: any) => {
          element.userImage = pro.image;
          element.userName = pro.names;
          this.comments.push(element);
        });
      });
    });
  }

  postComment() {
    this.content.value.articleId = this.article.id;
    this.userService.me().subscribe((user: any) => {
      this.content.value.userId = parseInt(user.id, 10);
      this.commentaryService.post(this.content.value).subscribe((com: any) => {
        this.userService.getProfileById(com.userId).subscribe((use: any) => {
          const newComment = {
            comment: com.comment,
            userImage: use.image,
            userName: use.names,
            created: com.created
          }
          this.comments.unshift(newComment);
        });
      });
    });
  }

}
