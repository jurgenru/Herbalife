import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  store: any = {};
  productForm: FormGroup;
  iconImage:any;
  portraitImage:any;
  productImage:any;

  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addProductForm();
  }
  createForm() {
    this.productForm = this.formBuilder.group({
      product: this.formBuilder.array([])
    });
  }
  addProductForm() {
    const FormInputs = this.formBuilder.group({
      // image: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      description: new FormControl(''),
      
      //category1: new FormControl(''),
      // category2: new FormControl(''),
      // category3: new FormControl(''),
      // category4: new FormControl(''),
    });

    this.product.push(FormInputs);
  }
  removeProduct(index: number) {
    this.product.removeAt(index);
  }
  get product(): FormArray {
    return this.productForm.get('product') as FormArray;
  }
  submit() {
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
  showProduct(){
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.productImage = data;
    });
  }

  post () {
    const start = new Date();
    this.store.userId = "string",
    this.store.title = "string",
    this.store.description = "string",
    this.store.image= "string",
    this.store.icon = "string"
    this.storeService.post(this.store).subscribe(data => {
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      setTimeout(() => {
        console.log(data);

        const dataStore = data;
      
      }, elapsed);
    });
  }

}
