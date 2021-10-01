import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrder'
})
export class FilterOrderPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 2) return value;

    const resultPosts = [];

    for (const post of value) {
      if (post.names.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.deliveryMethod.indexOf(arg) > -1 || post.created.indexOf(arg) > -1) {
        resultPosts.push(post);
      }
    };
    return resultPosts;
  }

}
