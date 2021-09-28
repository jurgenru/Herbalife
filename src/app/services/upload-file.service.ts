import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
//https://medium.com/ramsatt/angular-7-upload-file-to-amazon-s3-bucket-ba27022bad54
// COMANDO npm install aws-sdk
//https://ozenero.com/angular-4-amazon-s3-example-how-to-upload-file-to-s3-bucket#1_Set_up_Amazon_S3

@Injectable()
export class UploadFileService {

  FOLDER = 'jsa-s3/';

  constructor() { }

  uploadfile(file) {
    console.log('filef', file);
    const bucket = new S3(
      {
        accessKeyId: 'YOUR-ACCESS-KEY-ID',
        secretAccessKey: 'YOUR-SECRET-ACCESS-KEY',
        region: 'us-east-1'
      }
    );

    const params = {
      Bucket: 'jsa-angular4-bucket',
      Key: this.FOLDER + file.name,
      Body: file
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

}