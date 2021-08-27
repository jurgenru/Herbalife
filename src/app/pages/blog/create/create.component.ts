import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  blogForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addArticleForm();
  }

  createForm() {
    this.blogForm = this.formBuilder.group({
      article: this.formBuilder.array([])
    });
  }
  addArticleForm() {
    const FormInputs = this.formBuilder.group({
      title: new FormControl(''),
      themeDevelop: new FormControl(''),
    });
  
    this.article.push(FormInputs);
  }
  removeArticle(index: number) {
    this.article.removeAt(index);
  }
  get article(): FormArray {
    return this.blogForm.get('article') as FormArray;
  }

}
