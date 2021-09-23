import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

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
  productAddPrice: any =[];
  productAddDescription: any =[];
  
  productFeatures: any = [];

  features: any=[];
  featureIndex: number = 0;
  productData: any;
  editedStore: any = {};
  editedProduct: any = {};

  constructor(
    private simpleModalService: SimpleModalService,
    private storeService: StoreService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.get();
  }

  ngOnInit(): void {
  }
  get() {
    this.content = 'Cargando ...';
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.storeService.getById(val.id).subscribe((data: any) => {
        this.storeService.getProductsById(val.id).subscribe((prod: any) => {
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
              this.features[this.featureIndex] =  JSON.parse(element.additionalFeatures);
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
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
    });
  }

  showImage() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.image = data;
      this.updateImage = 1;
    });
  }

  showProduct(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.productImage[index] = data;
      //((this.productForm.get('product') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }

  changeFeature(event,productIndex,featureIndex){
    this.productFeatures = this.features[productIndex];
    this.features[productIndex].forEach((element, index) => {
      if(index == featureIndex){
        this.productFeatures[index]= event.target.value;
      }    
    });
    this.features[productIndex]=this.productFeatures;
  }
edit(){
  this.content = 'Editando tienda...';
  const start = new Date();
  this.spinner.start();
  if(this.icon){
    this.editedStore.icon = this.icon;
  }
  if(this.image){
    this.editedStore.image = this.image;
  }
  this.storeService.update(this.storeData.id, this.editedStore).subscribe( data =>{
    const end = new Date();
    const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
    setTimeout(() => {
      this.spinner.stop();
      this.router.navigate(['store/list']);
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el blog exitosamente', '5000', 'success', 'top', 'center');
    }, elapsed);
  }, error =>{
    this.spinner.stop();
    this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center')
  });
}

editProduct(productId: any, index: any){
  this.content = 'Editando producto...';
  const start = new Date();
  this.spinner.start();

  if(this.productName[index]){
    this.editedProduct.name = this.productName[index];
  }
  if(this.productPrice[index]){
    this.editedProduct.price = this.productPrice[index];
  }
  if(this.productAmount[index]){
    this.editedProduct.amount = this.productAmount[index];
  }
  if(this.productDescription[index]){
    this.editedProduct.description = this.productDescription[index];
  }
  if(this.productImage[index]){
    this.editedProduct.image = this.productImage[index];
  }
  if(this.productAddPrice[index]){
    this.editedProduct.additionalPrice = this.productAddPrice[index];
  }
  if(this.productAddDescription[index]){
    this.editedProduct.addtionalDescription = this.productAddDescription[index];
  }
  this.editedProduct.additionalFeatures = JSON.stringify(this.features[index])
  
  this.productService.update(productId,this.editedProduct).subscribe( data =>{
    const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
      setTimeout(() => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el producto exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
  },error => {
    this.spinner.stop();
    this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center');
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
redirectFair() {

  localStorage.setItem('tokenFV', 'u001s34u23a'); 
  localStorage.setItem('idFV', '0001'); 
  
  let userData = {
    token: localStorage.getItem("tokenFV"),
    id: localStorage.getItem("idFV")
  };
  const redirect = window.open("http://54.91.163.221/", "polarnia")
  setTimeout(()=>{
    redirect.postMessage(userData, "http://54.91.163.221/")
  }, 1500);
}
}
