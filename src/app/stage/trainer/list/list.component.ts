import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
    selector: 'app-trainer-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    trainers: any = [];

    constructor(
        private trainerService: TrainerService,
        private spinner: NgxUiLoaderService,
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        const start = new Date();
        // this.spinner.start();
        const filter = `{"fields": {"id": true, "names": true, "icon": true}, "order":["id DESC"]}`;
        this.trainerService.get(filter).subscribe((data: any) => {
            data.forEach(element => {
                this.trainerService.getLectionById(element.id).subscribe((lect: any) => {
                    const end = new Date();
                    const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
                    setTimeout(() => {
                        element.imageLection = lect.image;
                        element.nameLection = lect.name;
                        this.trainers.push(element);
                        // this.spinner.stop();
                    }, elapsed);
                }, error => {
                    // this.spinner.stop();
                });
            });
        }, error => {
            // this.spinner.stop();
        });
    }

}