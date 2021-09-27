import { Component } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface AlertModel {
    title?: string;
    message: string;
  }

@Component({
  selector: "app-image-cropper",
  templateUrl: "./image-cropper.component.html",
  styleUrls: ["./image-cropper.component.css"]
})


export class ImageCropperComponent extends SimpleModalComponent<AlertModel, null> {

    imageChangedEvent: any = '';
    croppedImage: any = '';

    constructor() {
      super();
    }

    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
  }

  cropperReady() {
  }
  
  loadImageFailed() {
  }

  imageSave() {
    this.result = this.croppedImage;
    this.close();
  }

  }