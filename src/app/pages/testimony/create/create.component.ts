import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { StatementService } from "src/app/services/statement.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  statement: any = {};
  imageContent: any;
  constructor(
    private SimpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private statementService: StatementService,
    private spinner: NgxUiLoaderService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.createStatementForm();
  }

  createStatementForm(){
    this.statement = this.formBuilder.group({
        userId: ['string'],
        image: ['string'],
        name: ['', Validators.required],
        description: ['', Validators.required],
    });
  }

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageContent = data;
      }
    );
  }

  get nameField() {
    return this.statement.get("name");
  }

  get descriptionField() {
    return this.statement.get("description");
  }

  post(){
    const start = new Date();
    this.spinner.start();
    this.statement.value.image = this.imageContent

    this.statementService.post(this.statement.value).subscribe((data :any ) => {
      this.statement.value.userId = data.id;
      console.log(data);
      console.log(this.statement.value);
      this.statementService.post(this.statement.value).subscribe(statementData =>{
       const end = new Date();
       const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
       setTimeout(() => {
         console.log(statementData);
         this.spinner.stop();
       }, elapsed);
      });
     this.router.navigate(['/service/list'])
   });
  }
}
