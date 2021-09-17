import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceService } from 'src/app/services/service.service';

@Component({
    selector: 'app-service-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    services: any;

    constructor(
        private spinner: NgxUiLoaderService,
        private serviceService: ServiceService
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        const start = new Date();
        this.spinner.start();
        const filter = `{"fields": {"id": true, "title": true, "image": true, "created": true}, "order":["created DESC"]}`;
        this.serviceService.get(filter).subscribe(data => {
            const end = new Date();
            const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
            setTimeout(() => {
                this.services = data;
                this.spinner.stop();
            }, elapsed);
        });
    }

}