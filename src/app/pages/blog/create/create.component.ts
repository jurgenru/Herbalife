import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  articleForm: any = {};
  blog: any = {};
  iconImage: any;
  portraitImage: any;
  articleImage: any = [];
  articleImage1: any;
  articleImage2: any;
  
  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addArticle();
  }

  createForm() {
    this.blog= this.formBuilder.group({
      name: ['',Validators.required],
      icon:[''],
      image: [''],
      video: [''],
      userId: [''],
    });

    this.articleForm = this.formBuilder.group({
      article: this.formBuilder.array([])
    });
  }
  addArticle() {
    const FormInputs = this.formBuilder.group({
      title: ['',Validators.required],
      description:['',Validators.required],
      image:[''],
      blogId:[],
      ranting:['']
    });
  
    this.article.push(FormInputs);
  }

  removeArticle(index: number) {
    this.article.removeAt(index);
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
  showBlog(index: any){
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      //this.asign(index,data);
      this.articleImage[index] = data;
      ((this.articleForm.get('article') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }
  
  post(){
    this.blog.value.icon = this.iconImage;
    this.blog.value.image = this.portraitImage;
    console.log(this.blog.value);
    console.log(this.articleForm.value);
  }
  get article(): FormArray {
    return this.articleForm.get('article') as FormArray;
  }
  get name(){
    return this.blog.get("name");
  }
  get title(){
    return this.article.get('title');
  }
  get description(){
    return this.article.get('description');
  }
}
