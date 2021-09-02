import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  imageProfile: any;
  constructor(
    private SimpleModalService: SimpleModalService
  ) { }

  ngOnInit(): void {
  }

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageProfile = data;
    });
  }

}
