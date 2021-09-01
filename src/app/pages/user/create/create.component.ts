import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  imageProfile: any;

  constructor(private SimpleModalService: SimpleModalService) { }

  ngOnInit() {
  }

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageProfile = data;
    });
  }

}
