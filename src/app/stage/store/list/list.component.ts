import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-store-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    stores: any;

    constructor(
        private spinner: NgxUiLoaderService,
        private storeService: StoreService
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        const start = new Date();
        this.spinner.start();
        const filter = `{"fields": {"id": true, "title": true, "image": true, "created": true}, "order":["created DESC"]}`;
        this.storeService.get(filter).subscribe(data => {
            const end = new Date();
            const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
            setTimeout(() => {
                this.stores = data;
                this.spinner.stop();
            }, elapsed);
        });
    }

}