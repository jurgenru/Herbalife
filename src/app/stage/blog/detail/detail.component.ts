import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  article: any = {};

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { 
    this.get();
  }

  ngOnInit() { }

  get() {
    this.route.params.subscribe(val => {
      this.articleService.getById(val.id).subscribe(data => {
        console.log(data);
        this.article = data;
      });
    });
  }

}
