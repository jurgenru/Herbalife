import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  numero = {
    id: 1
  }

  constructor(
    private userService: UserService,
    private storeService: StoreService,
    // private productService: ProductSeriv
    
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const filter = `{"fields": {"id": true, "title": true, "description": true, "created": true}, "order":["id DESC"]}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getStoreByUserId(data.id, filter).subscribe(store => {
        this.lists = store;
      });
    });
  }

  showDelete(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
      this.storeService.delete(result).subscribe(store => {

      })
    }, (reason) => {
      console.log(reason);
    });
  }
}
