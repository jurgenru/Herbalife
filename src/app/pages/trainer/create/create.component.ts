import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
    private lectionService: LectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.createTrainerForm();
    this.createLectionForm();
  }
  post(){
    const start = new Date();
    this.spinner.start();
    this.trainer.value.image = this.iconImage;
    this.trainer.value.imageFront = this.portraitImage;
    this.lection.value.image = this.courseImage;

    this.trainerService.post(this.trainer.value).subscribe((data :any ) => {      
       this.lection.value.trainerId = data.id;
       this.lectionService.post(this.lection.value).subscribe(lectionData =>{  
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
        }, elapsed);
       });
      this.router.navigate(['/trainer/list'])
    });
  }
  
  createTrainerForm(){
    this.trainer = this.formBuilder.group({
      names: ['',Validators.required],
      description: ['',Validators.required],
      image: [''],
      imageFront: [''],
      socialMedia: this.formBuilder.group({
        email:['',Validators.email],
        whatsapp:[''],
        telegram:[''],
        facebook:[''],
        instagram:[''],
        youtube: [''],
        tiktok: ['']

      }),
    });
    // this.trainer = new FormGroup({
    //   names: new FormControl('',Validators.required),
    //   description: new FormControl('',Validators.required),
    //   image: new FormControl(''),
    //   imageFront: new FormControl(''),
    //   socialMedia: new FormControl('')
    // });
  }
  get names(){
    return this.trainer.get('names');
  }
  get description(){
    return this.trainer.get('description');
  }
  get email(){
    return this.trainer.get('socialMedia').get('email');
  }
  get name(){
    return this.lection.get('name');
  }
  get mode(){
    return this.lection.get('mode');
  }
  get titleGratitude(){
    return this.lection.get('titleGratitude');
  }
  get descriptionGratitude(){
    return this.lection.get('descriptionGratitude');
  }

  createLectionForm(){
    this.lection= this.formBuilder.group({
      trainerId: [],
      name: ['',Validators.required],
      description:['',Validators.required],
      mode: ['',Validators.required],
      image: [''],
      titleGratitude: ['',Validators.required],
      descriptionGratitude: ['',Validators.required]
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
