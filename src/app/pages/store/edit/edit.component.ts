import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  content: any;
  storeData: any = {};
  updateIcon: number = 2;
  updateImage: number = 2;

  icon: any;
  image: any;

  productImage: any = [];
  productName: any = [];
  productPrice: any = [];
  productAmount: any = [];
  productDescription: any = [];
  productAddPrice: any = [];
  productAddDescription: any = [];

  productFeatures: any = [];

  features: any = [];
  featureIndex: number = 0;
  productData: any;
  editedStore: any = {};
  editedProduct: any = {};

  newProductImage: any = [];
  btnAddProduct: any;
  btnPostProduct: any;
  countProduct = 0;
  productForm: any = {};
  countFeatures = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  btnAddFeature: any = [];
  newFeatures: any = {};
  constructor(
    private simpleModalService: SimpleModalService,
    private storeService: StoreService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.get();
  }

  ngOnInit(): void {
    this.addProductForm()
  }
  get() {
    this.content = 'Cargando ...';
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.storeService.getById(val.id).subscribe((data: any) => {
        this.storeService.getProductsById(val.id).subscribe((prod: any) => {
          console.log(prod);
          const end = new Date();
          const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);

          setTimeout(() => {
            if (data.icon !== "") {
              this.updateIcon = 0;
            }
            if (data.image !== "") {
              this.updateImage = 0;
            }
            this.storeData = data;
            this.productData = prod;
            this.productData.forEach(element => {
              this.features[this.featureIndex] = JSON.parse(element.additionalFeatures);
              this.featureIndex++;
              element.additionalFeatures = JSON.parse(element.additionalFeatures);
            });
            this.spinner.stop();
          }, elapsed);
        }, error => {
          this.spinner.stop()
        });
      }, error => {
        this.spinner.stop();
      });
    }, error => {
      this.spinner.stop();
    });
  }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent, { format: 1 / 1 }).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
      if(data == null){
        this.updateIcon = 0;
      }
    });
  }

  showImage() {
    this.simpleModalService.addModal(ImageCropperComponent, { format: 16 / 9 }).subscribe((data) => {
      this.image = data;
      this.updateImage = 1;
      if(data == null){
        this.updateImage = 0;
      }
    });
  }

  showProduct(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent, { format: 16 / 9 }).subscribe((data) => {
      this.productImage[index] = data;
    });
  }
  showNewProduct(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent, { format: 16 / 9 }).subscribe((data) => {
      this.newProductImage[index] = data;
      ((this.productForm.get('newProduct') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }

  changeFeature(event, productIndex, featureIndex) {
    this.productFeatures = this.features[productIndex];
    this.features[productIndex].forEach((element, index) => {
      if (index == featureIndex) {
        this.productFeatures[index] = event.target.value;
      }
    });
    this.features[productIndex] = this.productFeatures;
  }

  edit() {
    this.content = 'Editando tienda...';
    const start = new Date();
    this.spinner.start();
    if (this.icon) {
      this.editedStore.icon = this.icon;
    }
    if (this.image) {
      this.editedStore.image = this.image;
    }
    this.storeService.update(this.storeData.id, this.editedStore).subscribe(data => {
      const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
      setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(['store/list']);
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el blog exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center')
    });
  }

  editProduct(productId: any, index: any) {
    this.content = 'Editando producto...';
    const start = new Date();
    this.spinner.start();

    if (this.productName[index]) {
      this.editedProduct.name = this.productName[index];
    }
    if (this.productPrice[index]) {
      this.editedProduct.price = this.productPrice[index];
    }
    if (this.productAmount[index]) {
      this.editedProduct.amount = this.productAmount[index];
    }
    if (this.productDescription[index]) {
      this.editedProduct.description = this.productDescription[index];
    }
    if (this.productImage[index]) {
      this.editedProduct.image = this.productImage[index];
    }
    if (this.productAddPrice[index]) {
      this.editedProduct.additionalPrice = this.productAddPrice[index];
    }
    if (this.productAddDescription[index]) {
      this.editedProduct.addtionalDescription = this.productAddDescription[index];
    }
    this.editedProduct.additionalFeatures = JSON.stringify(this.features[index])

    this.productService.update(productId, this.editedProduct).subscribe(data => {
      const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
      setTimeout(() => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el producto exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  addProductForm() {
    this.productForm = this.formBuilder.group({
      newProduct: this.formBuilder.array([])
    });
  }
  addProduct() {
    this.countProduct++;
    this.btnPostProduct = true;
    const FormInputs = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      price: ['', Validators.required],
      userId: [''],
      additionalPrice: [''],
      addtionalDescription: [''],
      amount: ['', Validators.required],
      storeId: [],
      additionalFeatures: this.formBuilder.array([])
    });
    this.newProduct.push(FormInputs);
    if ((this.countProduct + this.productData.length) > 11) {
      this.btnAddProduct = true;
    }
  }
  removeProduct(index: number) {
    this.countProduct--;
    this.newProduct.removeAt(index);
    if ((this.countProduct + this.productData.length) < 12) {
      this.btnAddProduct = false;
    }
    if (this.countProduct <= 0) {
      this.btnPostProduct = false;
    }
  }
  addFeature(featureArray: FormArray, index: any) {
    this.countFeatures[index]++;
    featureArray.push(this.formBuilder.control(''));
    if (this.countFeatures[index] > 2) {
      this.btnAddFeature[index] = true;
    }
  }
  removeFeature(featureArray: FormArray, j: number, index: number) {
    this.countFeatures[index]--;
    featureArray.removeAt(j)
    if (this.countFeatures[index] < 3) {
      this.btnAddFeature[index] = false;
    }
  }

  get newProduct(): FormArray {
    return this.productForm.get('newProduct') as FormArray;
  }
  post() {
    this.content = 'Agregando los productos';
    const start = new Date();
    this.spinner.start();

    this.route.params.subscribe(val => {
      this.userService.me().subscribe((user: any) => {
        this.newProduct.controls.forEach((element) => {
          element.value.userId = user.id;
          element.value.storeId = parseInt(val.id);
          element.value.additionalFeatures = JSON.stringify(element.value.additionalFeatures);
          this.productService.post(element.value).subscribe((productData: any) => {
            const end = new Date();
            const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
            setTimeout(() => {
              this.spinner.stop();
              this.router.navigate(['/store/list']);
              this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha agregado el producto', '5000', 'success', 'top', 'center');
            }, elapsed);
          }, error => {
            this.spinner.stop();
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear el producto, intente nuevamente', '5000', 'danger', 'top', 'center');
          });

        });
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
