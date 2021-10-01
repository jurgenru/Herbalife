import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  articleForm: any = {};
  blog: any = {};
  icon: any;
  banner: any;
  articleImage: any = [];
  countArticle: number = 0;
  btnAddArticle: any;

  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private articleService: ArticleService,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addArticle();
  }

  createForm() {
    this.blog = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.articleForm = this.formBuilder.group({
      article: this.formBuilder.array([])
    });
  }

  addArticle() {
    this.countArticle++;
    const FormInputs = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      blogId: [],
      ranting: ['']
    });
    this.article.push(FormInputs);
    if (this.countArticle > 11) {
      this.btnAddArticle = true;
    }
  }

  removeArticle(index: number) {
    this.countArticle--;
    this.article.removeAt(index);
    if (this.countArticle < 12) {
      this.btnAddArticle = false;
    }
  }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.icon = data;
    });
  }

  showBanner() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.banner = data;
    });
  }

  showBlog(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.articleImage[index] = data;
      ((this.articleForm.get('article') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((user: any) => {
      this.blog.value.userId = user.id;
      this.blog.value.icon = this.icon;
      this.blog.value.banner = this.banner;
      this.blogService.post(this.blog.value).subscribe((data: any) => {
        this.article.controls.forEach((element) => {
          element.value.blogId = data.id;
          element.value.ranting = "[]";
          this.articleService.post(element.value).subscribe((articleData: any) => {
          }, error => {
            this.spinner.stop();
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear el articulo, intente nuevamente', '5000', 'danger', 'top', 'center');
          });
        });
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['/blog/list']);
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha creado el blog exitosamente', '5000', 'success', 'top', 'center');
        }, elapsed);
      }, error => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear el blog, intente nuevamente', '5000', 'danger', 'top', 'center');
      });
    });
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, '', {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: 'toast-' + from + '-' + align
    });
  }

  get article(): FormArray {
    return this.articleForm.get('article') as FormArray;
  }

  get name() {
    return this.blog.get("name");
  }
}
