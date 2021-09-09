import { Component, OnInit } from '@angular/core';
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
    private blogService: BlogService,
  ) {
    this.blogService.getById(1).subscribe(res => {
      this.blog = res;
      console.log(this.blog);
    })
  }

  ngOnInit(): void {
  }

}
