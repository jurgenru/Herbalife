import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-blog-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  blogForm: FormGroup;
  iconImage: any;
  portraitImage: any;
  blogImage: any;
  btnAddArticle: any;
  countArticle: any;

  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addArticleForm();
  }

  createForm() {
    this.blogForm = this.formBuilder.group({
      blogTitle: "",
      article: this.formBuilder.array([])
    });
  }
  addArticleForm() {
    this.countArticle = this.blogForm.value.article.length;
    if (this.countArticle > 11) {
      this.btnAddArticle = true;
    } else {
      const FormInputs = this.formBuilder.group({
        title: new FormControl(''),
        themeDevelop: new FormControl(''),
      });

      this.article.push(FormInputs);
    }
  }
  removeArticle(index: number) {
    this.article.removeAt(index);
    this.countArticle = this.blogForm.value.article.length;
    if (this.countArticle < 12) {
      this.btnAddArticle = false;
    }
  }
  get article(): FormArray {
    return this.blogForm.get('article') as FormArray;
  }
  get blogTitle() {
    return this.blogForm.get("blogTitle");
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
  showBlog() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.blogImage = data;
    });
  }
  submit() {
    console.log(this.blogForm.value)
  }
}
