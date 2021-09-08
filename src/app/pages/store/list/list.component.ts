import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filterPost = '';
  pageActual = 1;
  lists: any = [];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const filter = `{"order":["id DESC"]}`;
    this.storeService.get(filter).subscribe(data => {
      this.lists = data;
      console.log(this.lists);
    });
  }

}
