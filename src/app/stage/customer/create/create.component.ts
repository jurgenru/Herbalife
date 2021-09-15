import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SimpleModalService } from "ngx-simple-modal";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";

@Component({
  selector: 'app-customer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  profile: any = {};
  image: any;

  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createProfileForm();
   }

  showImage() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
    //   // this.banner = data;
    this.image = data;
    });
  }

  createProfileForm(){ 
    this.profile = this.formBuilder.group({
      names: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  get names() {
    return this.profile.get('names');
  }

  get address() {
    return this.profile.get('address');
  }

  get city() {
    return this.profile.get('city');
  }

  get country() {
    return this.profile('country');
  }

  post() {

  }

}