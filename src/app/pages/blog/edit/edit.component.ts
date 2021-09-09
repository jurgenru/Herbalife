import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  blog: any = {};
  articles: any;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(val => {
      this.blogService.getById(val.id).subscribe(data => {
        this.blog = data;
      });
      this.blogService.getArticleById(val.id).subscribe(res => {
        this.articles = res;
      })
    })
  }

  ngOnInit(): void { }

}
