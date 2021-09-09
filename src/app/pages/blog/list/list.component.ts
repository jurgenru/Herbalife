import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filterPost = '';
  pageActual = 1;
  lists: any = [];

  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const filter = `{"order":["id DESC"]}`;
    this.blogService.get(filter).subscribe(data => {
      this.lists = data;
      console.log(this.lists);
    });
  }

}
