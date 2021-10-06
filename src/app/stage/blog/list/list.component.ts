import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from 'src/app/services/blog.service';

@Component({
    selector: 'app-blog-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    blogs: any;

    constructor(
        private spinner: NgxUiLoaderService,
        private blogService: BlogService
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        const start = new Date();
        this.spinner.start();
        const filter = `{"fields": {"id": true, "name": true, "banner": true, "created": true}, "order":["id DESC"]}`;
        this.blogService.get(filter).subscribe(data => {
            const end = new Date();
            const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
            setTimeout(() => {
                this.blogs = data;
                this.spinner.stop();
            }, elapsed);
        }, error => {
            this.spinner.stop();
        });
    }

}