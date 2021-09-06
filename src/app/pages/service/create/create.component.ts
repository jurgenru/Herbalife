import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SimpleModalService } from "ngx-simple-modal";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";

@Component({
  selector: "app-service-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  services: number;

  imageIcon: any;
  imageCover: any;
  imageDescription: any;

  Types: any = ["Gimnasio", "Comida", "Otros"];
  service: any = {};
  constructor(
    private SimpleModalService: SimpleModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  serviceForm = this.formBuilder.group({
    name: ["", Validators.required],
    title: ["", Validators.required],
    description: ["", Validators.required],
    gratDesc: ["", Validators.required],
    gratTitle: ["", Validators.required],
  });

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageIcon = data;
      }
    );
  }

  showCover() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageCover = data;
      }
    );
  }

  showDescription() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageDescription = data;
      }
    );
  }

  get nameField() {
    return this.serviceForm.get("name");
  }

  get titleField() {
    return this.serviceForm.get("title");
  }
  get desField() {
    return this.serviceForm.get("description");
  }
  get gratdField() {
    return this.serviceForm.get("gratDesc");
  }
  get grattField() {
    return this.serviceForm.get("gratTitle");
  }

  post() {
    if (this.serviceForm.valid) {
      const service = this.serviceForm.value;
      console.log(service);
      // this.statementService.post(service).subscribe((newService) => {
      //   console.log(newService);
      // });
    }
  }
}
