import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  lists: any = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    const filter = `{"order":["id DESC"]}`;
    this.serviceService.get(filter).subscribe((data) => {
      this.lists = data;
      console.log(this.lists);
    });
  }
}
