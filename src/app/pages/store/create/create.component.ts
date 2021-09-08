import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
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

  iconImage:any;
  portraitImage:any;
  productImage:any;

  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addProductForm();
  }
  createForm() {
    this.store = this.formBuilder.group({
      userId:[''],
      title:[''],
      description:[''],
      image:[''],
      icon:[''],
    });

    this.productForm = this.formBuilder.group({
      product: this.formBuilder.array([])
    });
  }
  addProductForm() {
    const FormInputs = this.formBuilder.group({
      name: [''],
      description: [''],
      image: [''],
      price: [''],
      userId: [''],
      additionalFeatures:[''],
      additionalPrice:[''],
      amount: ['']
    });

    this.product.push(FormInputs);
  }
  removeProduct(index: number) {
    this.product.removeAt(index);
  }

  get product(): FormArray {
    return this.productForm.get('product') as FormArray;
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
  //   const filter = `{"fields": {"id": true}`;
  //   this.userService.me().subscribe((data: any) => {
  //     this.userService.getById(data.id,filter).subscribe((user: any) => {{
  //         this.store.userId = data.id;
  //     }});
  // });
    const start = new Date();
    this.store.userId = "1",
    this.store.image= this.portraitImage;
    this.store.icon = this.iconImage;

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
