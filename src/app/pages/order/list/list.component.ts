import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { OrderService } from "src/app/services/order.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-order-list',
    templateUrl: './list.component.html',
    //   styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    filterPost = '';
    lists: any = [];

    constructor(
        private userService: UserService,
        private orderService: OrderService,
        private modalService: NgbModal,
        private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        this.userService.me().subscribe((data: any) => {
            const filter = `{"fields": {"id": true, "deliveryMethod": true, "total": true, "created": true, "purcharseId": true}, "order":["id DESC"]}`;
            this.userService.getOrderById(data.id, filter).subscribe((ord: any) => {
                ord.forEach(element => {
                    this.userService.getProfileById(element.purcharseId).subscribe((pro: any) => {
                        element.names = pro.names;
                        this.lists.push(element);
                    });
                });
            });
        });
    }

    showDelete(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.orderService.delete(result).subscribe((blog) => {
                this.lists = [];
                this.get();
                this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado el pedido exitosamente', '5000', 'success', 'top', 'center');
            });
        });
    }
    notification(content, time, type, from, align) {
        this.toastr.error(content, '', {
            timeOut: time,
            closeButton: true,
            enableHtml: true,
            toastClass: `alert alert-${type} alert-with-icon`,
            positionClass: 'toast-' + from + '-' + align
        });
    }
}