import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { BlogService } from "src/app/services/blog.service";
import { PromotionService } from "src/app/services/promotion.service";
import { ServiceService } from "src/app/services/service.service";
import { StatementService } from "src/app/services/statement.service";
import { StoreService } from "src/app/services/store.service";
import { TrainerService } from "src/app/services/trainer.service";

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
    futureDate: any;
    key = 'cd';
    days: any;
    hours: any;
    min: any;
    sec: any;
    constructor(
        private trainerService: TrainerService,
        private spinner: NgxUiLoaderService,
        private promotionService: PromotionService,
        private serviceService: ServiceService,
        private blogService: BlogService,
        private storeService: StoreService,
        private statementService: StatementService
    ) {
        this.getContent();
    }

    ngOnInit() {
        if (localStorage.getItem(this.key) === null) {
            this.setFutureDate();
          }
    }
    setFutureDate(){
        var timeleft = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        var countDown  = timeleft*24*60*60*1000;
        this.futureDate  = new Date().getTime() + countDown;
        localStorage.setItem('cd', this.futureDate.toString());
    }
    getFutureDate() {
        return parseInt(localStorage.getItem(this.key));
      }
    
    x = setInterval(()=>{
        var today = new Date().getTime();
        var distance = this.getFutureDate()-today;
        this.days = Math.floor(distance/(1000*60*60*24));
        this.hours = Math.floor((distance %(1000*60*60*24))/(1000*60*60));
        this.min = Math.floor((distance %(1000*60*60))/(1000*60));
        this.sec = Math.floor((distance %(1000*60))/1000);
        if(distance <0){
            this.setFutureDate();
        }
    },1000)


    getContent() {
        const start = new Date();
        this.spinner.start();
        const filter = `{"fields": {"id": true, "title": true, "image": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
        this.promotionService.get().subscribe(pro => {
            this.promotions = pro;
            this.serviceService.get(filter).subscribe(ser => {
                const end = new Date();
                const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
                setTimeout(() => {
                    this.services = ser;
                    this.spinner.stop();
                }, elapsed);
                const filter2 = `{"fields": {"id": true, "name": true, "banner": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
                this.blogService.get(filter2).subscribe(blo => {
                    this.blogs = blo;
                    const filter3 = `{"fields": {"id": true, "title": true, "image": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
                    this.storeService.get(filter3).subscribe(sto => {
                        this.stores = sto;
                        const filter4 = `{"fields": {"id": true, "names": true, "icon": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
                        this.trainerService.get(filter4).subscribe((trai: any) => {
                            trai.forEach(element => {
                                this.trainerService.getLectionById(element.id).subscribe((lect: any) => {
                                    element.imageLection = lect.image;
                                    element.nameLection = lect.name;
                                    this.trainers.push(element);
                                    const filter5 = `{"fields": {"id": true, "name": true, "image": true,"description": true, "created": true}, "limit": 6 , "order":["created DESC"]}`;
                                    this.statementService.get(filter5).subscribe(stat => {
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