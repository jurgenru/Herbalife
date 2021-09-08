import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';

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
  
  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private articleService: ArticleService,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService

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
    const start = new Date();
    this.spinner.start();
    this.blog.value.userId = "1";
    this.blog.value.icon = this.iconImage;
    this.blog.value.image = this.portraitImage;
    
    this.blogService.post(this.blog.value).subscribe((data: any) =>{
      console.log(data);
      this.article.controls.forEach((element) => {
        element.value.blogId = data.id;
        this.articleService.post(element.value).subscribe((articleData:any)=>{
          console.log(articleData);
        });
      });
      const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.spinner.stop();
           // this.router.navigate(['/blog/list'])
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha creado el blog', '5000', 'success', 'top', 'center');
            
          }, elapsed);
    });
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, '', {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: 'toast-' + from + '-' +  align
    });
  }
  get article(): FormArray {
    return this.articleForm.get('article') as FormArray;
  }
  get name(){
    return this.blog.get("name");
  }
}
