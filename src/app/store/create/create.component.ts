import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
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
  submit(){
    console.log(this.product.value);
  }

}
