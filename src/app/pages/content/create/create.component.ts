import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  imageContent: any;
  imageContent2: any;
  imageContent3: any;
  imageContent4: any;
  services: any;

  constructor(
    private SimpleModalService: SimpleModalService,
    private userService: UserService,
    private serviceService: ServiceService) { }

  ngOnInit() {
    this.getServices();    
  }

  imageCropper() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent = data;
      const prom1 = {

      }
    });
  }

  imageCropper2() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent2 = data;
    });
  }

  imageCropper3() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent3 = data;
    });
  }

  imageCropper4() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent4 = data;
    });
  }

  getServices() {
    this.userService.me().subscribe((user: any) => {
    const filter = `{"fields": {"id": true, "title": true}, "order":["id DESC"]}`;
      this.userService.getServicesById(user.id, filter).subscribe(ser => {
        console.log(ser);
        this.services = ser;
      });
    });
  }

  post() {
    console.log(this.imageContent4, this.imageContent2, this.imageContent3, this.imageContent);
  }
}
