import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { BlogService } from "src/app/services/blog.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-blog-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filterPost = '';
  pageActual = 1;
  lists: any;

  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const filter = `{"fields": {"id": true, "name": true, "created": true}, "order":["id DESC"]}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getBlogById(data.id, filter).subscribe(blog => {
        this.lists = blog;
      });
    });
  }

  showDelete(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.blogService.delete(result).subscribe((blog) => {
        this.blogService.deleteArticleById(result).subscribe(art => {
          this.lists = [];
          this.get();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado el blog exitosamente', '5000', 'success', 'top', 'center');
        });
      });
    });
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, '', {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: 'toast-' + from + '-' + align
    });
  }
}