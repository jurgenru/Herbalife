import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filterPost = '';
  pageActual = 1;
  lists: any;

  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const filter = `{"fields": {"id": true, "title": true, "description": true, "created": true}, "order":["id DESC"]}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getBlogById(data.id, filter).subscribe(store => {
        this.lists = store;
      });
    });
  }

  showDelete(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.storeService.delete(result).subscribe((store) => {
        this.storeService.deleteProductById(result).subscribe(prod => {
          this.lists = [];
          this.get();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado la tienda exitosamente', '5000', 'success', 'top', 'center');
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
