import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  blog: any = {};
  articles: any;
  iconImage: any;
  portraitImage: any;
  articleImage: any = [];
  articleForm: any = {};

  constructor(
    private blogService: BlogService,
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(val => {
      this.blogService.getById(val.id).subscribe(data => {
        this.blog = data;
      });
      this.blogService.getArticleById(val.id).subscribe(res => {
        this.articles = res;
      })
    })
  }

  ngOnInit(): void { }

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
  showBlog(index: any) {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.articleImage[index] = data;
      ((this.articleForm.get('article') as FormArray).at(index) as FormGroup).get('image').patchValue(data);
    });
  }

}
