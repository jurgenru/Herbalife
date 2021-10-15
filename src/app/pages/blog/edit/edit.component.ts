import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  content = 'Cargando ...';
  dataBlog: any = {};
  blog: any = {};
  article: any = {};
  dataArticles: any;
  articleImage: any = [];
  articleTitle: any = [];
  iconImage: any;
  portraitImage: any;

  articleDescription: any = [];
  title: any;
  articleForm: any = {};
  newArticleImage: any=[];
  updateIcon: number = 2;
  updateBanner: number = 2;
  icon: any;
  banner: any;
  add: any;
  countArticle=0;
  btnAddArticle: any;
  constructor(
    private blogService: BlogService,
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.get();
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.blogService.getById(val.id).subscribe((data: any) => {
        this.blogService.getArticleById(val.id).subscribe(res => {
            if (data.icon !== "") {
              this.updateIcon = 0;
            }
            if (data.banner !== "") {
              this.updateBanner = 0;
            }
            this.dataBlog = data;
            this.dataArticles = res;
            const end = new Date();
            const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
            setTimeout(() => {
              this.spinner.stop();
            }, elapsed);
        });
      });
    });
  }

  ngOnInit() {
    this.createArticleForm();
  }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
      if(data == null){
        this.updateIcon = 0;
      }
    });
  }

  showBanner() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.banner = data;
      this.updateBanner = 1;
      if(data == null){
        this.updateBanner = 0;
      }
    });
  }

  showBlog(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.articleImage[index] = data;
    });
  }

  showNewArticle(index: any){
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.newArticleImage[index] = data;
      ((this.articleForm.get('newArticle') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }

  edit() {
    this.content = 'Editando...';
    const start = new Date();
    this.spinner.start();
    if (this.icon) {
      this.blog.icon = this.icon;
    }
    if (this.banner) {
      this.blog.banner = this.banner;
    }
    this.blog.userId = this.dataBlog.userId
    this.blogService.update(this.dataBlog.id, this.blog).subscribe(data => {
      const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
      setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(['blog/list']);
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el blog exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center');
    });

  }

  editArticle(articleId: any, index: any) {
    this.content = 'Editando artículo...';
    const start = new Date();
    if (this.articleTitle[index]) {
      this.article.title = this.articleTitle[index];
    }
    if (this.articleImage[index]) {
      this.article.image = this.articleImage[index];
    }
    if (this.articleDescription[index]) {
      this.article.description = this.articleDescription[index];
    }
    this.spinner.start();
    this.articleService.update(articleId, this.article).subscribe(data => {
      const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
      setTimeout(() => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el artículo exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }
  createArticleForm(){
    this.articleForm = this.formBuilder.group({
      newArticle: this.formBuilder.array([])
    });
  }
  addArticle(){
    this.countArticle++;
    this.add = true;
    const FormInputs = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      blogId: [],
      rating: ['']
    });
    this.newArticle.push(FormInputs);
    if ((this.countArticle + this.dataArticles.length) > 11) {
      this.btnAddArticle = true;
    }
  }

  removeArticle(index: number) {
    this.countArticle--;
    this.newArticle.removeAt(index);

    if ((this.countArticle + this.dataArticles.length) < 12) {
      this.btnAddArticle = false;
    }
    if(this.countArticle == 0){
      this.add =false
    }
  }
  post(){
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.newArticle.controls.forEach((element) => {
        element.value.blogId = parseInt(val.id);
        element.value.rating = "[]";
        this.articleService.post(element.value).subscribe(newArticleData => {
        }, error => {
          this.spinner.stop();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear el articulo, intente nuevamente', '5000', 'danger', 'top', 'center');
        });
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['/blog/list']);
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se agregaron los articulos al blog', '5000', 'success', 'top', 'center');
        }, elapsed);
      });
    });

  }
  get newArticle(): FormArray {
    return this.articleForm.get('newArticle') as FormArray;
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

}
