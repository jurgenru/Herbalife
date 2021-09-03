import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup
  imageContent: any;
  constructor(private SimpleModalService: SimpleModalService, private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      comentary: ['', Validators.required]
    })
  }

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent = data;
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get comentField() {
    return this.form.get('comentary');
  }

  post() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log("Por favor llene todos los espacios")
    }
  }
}
