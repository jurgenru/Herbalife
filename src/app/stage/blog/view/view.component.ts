import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  blog: any = {};
  articles: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { 
    this.get();
  }

  ngOnInit() {
  }

  get() {
    this.route.params.subscribe(val => {
      this.blogService.getById(val.id).subscribe((data: any) => {
        this.blog = data;
        console.log(data);
        this.blogService.getArticleById(data.id).subscribe(art => {
          this.articles = art;
          console.log(art);
        });
      });
    });
  }

}
