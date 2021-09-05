import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SimpleModalService } from "ngx-simple-modal";
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
    private statementService: StatementService
  ) {
  }

  ngOnInit(): void {}

  statementForm = this.formBuilder.group({
      userId: ["string"],
      image: ["string"],
      name: ["", Validators.required],
      description: ["", Validators.required],
  });

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageContent = data;
      }
    );
  }

  get nameField() {
    return this.statementForm.get("name");
  }

  get descriptionField() {
    return this.statementForm.get("description");
  }

  post() {
    if (this.statementForm.valid) {
      const statement = this.statementForm.value;
      console.log(statement);
      // this.statementService.post(statement).subscribe((newStatement) => {
      //   console.log(newStatement);
      // });
    }
  }

  postStatement(){
    this.statement.userId = "string",
    this.statement.image = "string",
    this.statement.name = "string",
    this.statement.description = "string"
    this.statementService.post(this.statement).subscribe(data => {
      console.log(data);
    });
  }
}
