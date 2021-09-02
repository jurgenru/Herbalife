import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SimpleModalService } from "ngx-simple-modal";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";

@Component({
  selector: "app-service-create",
  templateUrl: "./create.component.html",
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isSubmitted = false;
  services: number;

  imageIcon: any;
  imageCover: any;
  imageDescription: any;

  Types: any = ["Gimnasio", "Comida", "Otros"];
  constructor(
    public fb: FormBuilder,
    private SimpleModalService: SimpleModalService
  ) {}

  serviceForm = this.fb.group({
    serviceType: ["", [Validators.required]],
  });

  changeService(e) {
    console.log(e.value);
    this.serviceType.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get serviceType() {
    return this.serviceForm.get("serviceType");
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (!this.serviceForm.valid) {
      return false;
    } else {
      console.log(this.serviceForm.value);
    }
  }

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageIcon = data;
      }
    );
  }

  showCover(){
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageCover = data;
      }
    );
  }

  showDescription(){
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageDescription = data;
      }
    );
  }
}
