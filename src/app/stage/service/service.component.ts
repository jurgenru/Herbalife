import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  template: '<router-outlet></router-outlet>',
})
export class ServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
