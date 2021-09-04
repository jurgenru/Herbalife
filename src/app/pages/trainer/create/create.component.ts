import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { LectionService } from 'src/app/services/lection.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  iconImage: any;
  portraitImage: any;
  courseImage: any;

  trainer: any = {};
  lection: any = {};

  constructor(
    private simpleModalService: SimpleModalService,
    private trainerService: TrainerService,
    private lectionService: LectionService
  ) { }

  ngOnInit(): void {
    this.createTrainerForm();
    this.createLectionForm();
  }
  post(){
    this.trainer.value.image = this.iconImage;
    this.trainer.value.imageFront = this.portraitImage;
    this.lection.value.image = this.courseImage;

    this.trainerService.post(this.trainer.value).subscribe((data :any ) => {      
      console.log(data);
      this.lection.value.trainerId = data.id;
      this.lectionService.post(this.lection.value).subscribe(lectionData =>{  
      });
      //lectionService
      //redirrecionar a la lista al terminar  
      //averiguar Spinner    
    });
  }
  
  createTrainerForm(){
    this.trainer = new FormGroup({
      names: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      image: new FormControl(''),
      imageFront: new FormControl(''),
      socialMedia: new FormControl('')
    });
  }
  createLectionForm(){
    this.lection= new FormGroup({
      trainerId: new FormControl(),
      name: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      mode: new FormControl('',Validators.required),
      image: new FormControl(''),
      titleGratitude: new FormControl('',Validators.required),
      descriptionGratitude: new FormControl('',Validators.required)
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
