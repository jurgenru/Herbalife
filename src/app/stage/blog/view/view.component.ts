import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  blog: any = {};
  articles: any;
  blogs: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private spinner: NgxUiLoaderService,
    private router: Router
  ) {
    this.get();
    this.list();
  }

  ngOnInit() {
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.blogService.getById(val.id).subscribe((data: any) => {
        this.blog = data;
        this.blogService.getArticleById(data.id).subscribe(art => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
          this.articles = art;
          this.spinner.stop();
        }, elapsed);
        });
      });
    });
  }

  list() {
    const filter = `{"fields": {"id": true, "icon": true, "name": true}, "order":["id DESC"]}`;
    this.blogService.get(filter).subscribe(data => {
      this.blogs = data;
    });
  }

  viewBlog(id) {
    this.router.navigate(['/customer/blog/view', id]);
    setTimeout(() => {
      location.reload();
    }, 50);

  }

}
