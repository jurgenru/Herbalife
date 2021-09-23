import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { TrainerService } from "src/app/services/trainer.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    services: any;
    blogs: any;
    stores: any;
    trainers: any = [];
    lection: any;
    statements: any;
    promotions: any;

    constructor(
        private userService: UserService,
        private trainerService: TrainerService,
        private spinner: NgxUiLoaderService,
    ) {
        this.getContent();
    }

    ngOnInit() {
    }

    getContent() {
        const start = new Date();
        this.spinner.start();
        const filter = `{"fields": {"id": true, "title": true, "image": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
        this.userService.getPromotionById(1).subscribe(pro => {
            this.promotions = pro;
            this.userService.getServicesById(1, filter).subscribe(ser => {
                const end = new Date();
                const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
                setTimeout(() => {
                    this.services = ser;
                    this.spinner.stop();
                }, elapsed);
                const filter2 = `{"fields": {"id": true, "name": true, "banner": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
                this.userService.getBlogById(1, filter2).subscribe(blo => {
                    this.blogs = blo;
                    const filter3 = `{"fields": {"id": true, "title": true, "image": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
                    this.userService.getStoreById(1, filter3).subscribe(sto => {
                        this.stores = sto;
                        const filter4 = `{"fields": {"id": true, "names": true, "icon": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
                        this.userService.getTrainersById(1, filter4).subscribe((trai: any) => {
                            trai.forEach(element => {
                                this.trainerService.getLectionById(element.id).subscribe((lect: any) => {
                                    element.imageLection = lect.image;
                                    element.nameLection = lect.name;
                                    this.trainers.push(element);
                                    const filter5 = `{"fields": {"id": true, "name": true, "image": true,"description": true, "created": true}, "order":["created DESC"]}`;
                                    this.userService.getStatementById(element.id, filter5).subscribe(stat => {
                                        this.statements = stat;
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

}