import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
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
  productData: any;
  editedStore: any = {};

  constructor(
    private simpleModalService: SimpleModalService,
    private storeService: StoreService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
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
        this.storeService.getProductsById(val.id).subscribe(prod => {
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
}
