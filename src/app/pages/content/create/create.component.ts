import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';


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

  constructor(private SimpleModalService: SimpleModalService) { }

  ngOnInit(): void {
  }

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent = data;
    });
  }

  showAlert2() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent2 = data;
    });
  }

  showAlert3() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent3 = data;
    });
  }

  showAlert4() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent4 = data;
    });
  }
}
