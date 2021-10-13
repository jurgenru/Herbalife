import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ComplaintService } from 'src/app/services/complaint.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @ViewChild("complaintButton") complaintButton: ElementRef;

  product: any = {};
  userData: any = {};
  complaint: any;
  validate: boolean = false;
  Data: Array<any> = [
    { name: 'Producto falta de detalles', value: 'Producto falta de detalles' },
    { name: 'Producto con sobreprecio', value: 'Producto con sobreprecio' },
    { name: 'Producto inapropiado', value: 'Producto inapropiado' },
  ];
  modalReference: NgbModalRef;

  constructor(
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxUiLoaderService,
    private cartService: CartService,
    private userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private complaintService: ComplaintService,
    private toastr: ToastrService,
  ) {
    this.get();
  }

  ngOnInit() {
    this.initValidate();
    this.createComplaintForm();
  }

  initValidate() {
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true}}`;
      this.userService.getById(user.id, filter).subscribe((admin: any) => {
        this.userData = admin;
        if (admin.role == 'admin') {
          this.validate = true;
        } else {
          this.validate = false;
        }
      });
    });
  }

  createComplaintForm() {
    this.complaint = this.formBuilder.group({
      commentary: ["", Validators.required],
      reason: this.formBuilder.array([])
    });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.complaint.get('reason') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.productService.getById(val.id).subscribe(data => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.product = data;
          this.spinner.stop();
        }, elapsed);
      }, error => {
        this.spinner.stop();
      });
    });
  }

  get commentary() {
    return this.complaint.get("commentary");
  }


  addToCart(item: any) {
    if (this.userData) {
      this.cartService.addToCart(item);
    } else {
      this.showRegister();
    }
  }

  showRegister() {
    this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      if (data) {
        location.reload();
      }
    });
  }

  post() {
    this.complaint.value.denouncedId = this.product.userId;
    this.complaint.value.accuserId = this.userData.id;
    this.complaint.value.reason = JSON.stringify(this.complaint.value.reason);
    this.complaintService.post(this.complaint.value).subscribe(com => {
      this.modalReference.close();
      this.complaintButton.nativeElement.hidden = true;
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha denunciado exitosamente', '5000', 'success', 'top', 'center');
    }, error => {
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Hubo un error al denunciar, intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  open(content) {
    this.userService.me().subscribe((i: any) => {
      if (i) {
        this.modalReference = this.modalService.open(content, { size: 'sm' });
      }
    }, error => {
      this.showRegister();
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
