import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SimpleModalService } from "ngx-simple-modal";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";

@Component({
  selector: "app-service-create",
  templateUrl: "./create.component.html",
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  services: number;

  imageIcon: any;
  imageCover: any;
  imageDescription: any;

  Types: any = ["Gimnasio", "Comida", "Otros"];
  form: FormGroup
  service: any = {};
  constructor(
    private SimpleModalService: SimpleModalService,
    private formBuilder: FormBuilder
  ) {this.buildForm();}

  ngOnInit(): void {}

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      gratDesc: ['', Validators.required],
      gratTitle: ['', Validators.required]
    })
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

  get nameField() {
    return this.form.get('name');
  }

  get titleField() {
    return this.form.get('title');
  }
  get desField() {
    return this.form.get('description');
  }
  get gratdField() {
    return this.form.get('gratDesc');
  }
  get grattField() {
    return this.form.get('gratTitle');
  }

  post() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log("Por favor llene todos los espacios")
    }
  }
}
