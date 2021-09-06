import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
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

  trainerForm: FormGroup;
  lectionForm: FormGroup;

  constructor(
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  post(){
    console.log(this.trainerForm.value);
  }
  
  createForm(){
    this.trainerForm = new FormGroup({
      names: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      socialMedia: new FormControl('')
    });
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
