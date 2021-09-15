import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  stores: any = [
    {
      title: "Tienda 1",
    },
    {
      title: "Tienda 2",
    },
    {
      title: "Tienda 3",
    },
    {
      title: "Tienda 4",
    },
  ]
  products: any = [
    {
      name: "Prod 1",
      price: "30",
    },
    {
      name: "Prod 2",
      price: "50",
    },
    {
      name: "Prod 3",
      price: "15",
    },
    {
      name: "Prod 4",
      price: "100",
    },
    {
      name: "Prod 5",
      price: "80",
    },
    {
      name: "Prod 4",
      price: "55",
    },
  ];

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
  }
  getStores(){
  }
  getProducts(){

  }
}
