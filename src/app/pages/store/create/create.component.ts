import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  store: any = {};
  productForm: any = {};

  iconImage: any;
  portraitImage: any;
  productImage: any = [];

  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addProductForm();
  }
  createForm() {
    this.store = this.formBuilder.group({
      userId: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      icon: [''],
    });

    this.productForm = this.formBuilder.group({
      product: this.formBuilder.array([])
    });
  }
  addProductForm() {
    const FormInputs = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      price: ['', Validators.required],
      userId: [''],
      additionalFeatures: [''],
      additionalPrice: [''],
      amount: ['', Validators.required],
      storeId: []
    });

    this.product.push(FormInputs);
  }
  removeProduct(index: number) {
    this.product.removeAt(index);
  }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.iconImage = data;
    });
  }
  showPortrait() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.portraitImage = data;
    });
  }
  showProduct(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.productImage[index] = data;
      ((this.productForm.get('product') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((user: any) => {
      this.store.value.image = this.portraitImage;
      this.store.value.icon = this.iconImage;
      this.store.value.userId = user.id;
      this.storeService.post(this.store.value).subscribe((data: any) => {
        this.product.controls.forEach((element) => {
          element.value.userId = user.id;
          element.value.storeId = data.id;
          this.productService.post(element.value).subscribe((productData: any) => {
          }, error => {
            this.spinner.stop();
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear el producto, intente nuevamente', '5000', 'danger', 'top', 'center');
          });
        });
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['/store/list']);
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha creado la tienda exitosamente', '5000', 'success', 'top', 'center');
        }, elapsed);
      }, error => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear la tienda, intente nuevamente', '5000', 'danger', 'top', 'center');
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

  get product(): FormArray {
    return this.productForm.get('product') as FormArray;
  }

  get title() {
    return this.store.get("title");
  }

  get description() {
    return this.store.get("description");
  }
}
