import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  content = 'Cargando ...';
  dataBlog: any = {};
  blog: any = {};
  article: any = {};
  dataArticles: any;
  iconImage: any;
  portraitImage: any;
  articleImage: any = [];
  articleForm: any = {};

  updateIcon: number = 2;
  updateBanner: number = 2;
  icon: any;
  banner: any;

  constructor(
    private blogService: BlogService,
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.get();
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.blogService.getById(val.id).subscribe((data: any) => {
      this.blogService.getArticleById(val.id).subscribe(res => {
        const end = new Date();
        const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
        setTimeout(() => {
          if (data.icon !== "") {
            this.updateIcon = 0;
          }
          if (data.image !== "") {
            this.updateBanner = 0;
          }
          this.dataBlog = data;
          this.dataArticles = res;
          this.spinner.stop();
        }, elapsed);
      });
    });
    });
  }

  ngOnInit() { }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
    });
  }

  showBanner() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.banner = data;
      this.updateBanner = 1;
    });
  }

  showBlog(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.articleImage[index] = data;
      ((this.articleForm.get('article') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }

  edit() {
    this.content = 'Editando ...';
    const start = new Date();
    this.spinner.start();
    if (this.iconImage) {
      this.blog.icon = this.iconImage;
    }
    if (this.portraitImage) {
      this.blog.image = this.portraitImage;
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


  editArticle() {
    console.log(this.article);
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
