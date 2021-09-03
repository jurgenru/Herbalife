import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-trainer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  iconImage: any;
  portraitImage: any;
  courseImage: any;

  constructor(
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit(): void {
  }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.iconImage = data;
    });
  }
  showPortrait() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.portraitImage = data;
    });
  }
  showCourse() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.courseImage = data;
    });
  }
}
