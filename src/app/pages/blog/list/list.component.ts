import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.userService.me().subscribe((data: any) => {
      this.userService.getBlogById(data.id).subscribe(blo => {
        console.log(blo);
        this.lists = blo;
      });
    });
  }

}
