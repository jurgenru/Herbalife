import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { ServiceService } from "src/app/services/service.service";


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

  serviceType: any = ['Normal', 'Encuesta de emprededores', 'Otro Servicio']
  Types: any = ["Gimnasio", "Comida", "Otros"];
  service: any = {};
  constructor(
    private SimpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private spinner: NgxUiLoaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createServiceForm();
  }

  createServiceForm(){
    this.service = this.formBuilder.group({
      userId: ['string'],
      name: ['', Validators.required],
      mode: [''],
      icon: ['string'],
      description: ['', Validators.required],
      image: ['string'],
      video: ['string'],
      title: ['', Validators.required],
      titleGratitude: ['', Validators.required],
      descriptionGratitude: ['', Validators.required],
      type: [''],
    });
  }

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
    return this.service.get('name');
  }

  get titleField() {
    return this.service.get('title');
  }
  get desField() {
    return this.service.get('description');
  }
  get gratdField() {
    return this.service.get('descriptionGratitude');
  }
  get grattField() {
    return this.service.get('titleGratitude');
  }
  get typeField() {
    return this.service.get('type');
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.service.value.icon = this.imageIcon,
    this.service.value.video = this.imageCover,
    this.service.value.image = this.imageDescription

    this.serviceService.post(this.service.value).subscribe((data :any ) => {
      this.service.value.userId = data.id;
      console.log(data);
      console.log(this.service.value);
      this.serviceService.post(this.service.value).subscribe(serviceData =>{
       const end = new Date();
       const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
       setTimeout(() => {
         console.log(serviceData);
         this.spinner.stop();
       }, elapsed);
      });
     this.router.navigate(['/service/list'])
   });
  }
}
