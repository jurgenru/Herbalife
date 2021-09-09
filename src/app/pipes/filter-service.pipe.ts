import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterService'
})
export class FilterServicePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 2) return value;

    const resultService = [];

    for(const post of value) {
      if( post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.description.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.created.indexOf(arg) > -1) {
        resultService.push(post);
      }
    };
    return resultService;
  }
}
