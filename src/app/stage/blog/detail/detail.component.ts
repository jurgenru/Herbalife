import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
    private articleService: ArticleService,
    private spinner: NgxUiLoaderService
  ) { 
    this.get();
  }

  ngOnInit() { }s

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.articleService.getById(val.id).subscribe(data => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
        this.article = data;
        this.spinner.stop();
      }, elapsed);
      });
    });
  }

}
