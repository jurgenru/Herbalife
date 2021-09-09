import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBlog'
})
export class FilterBlogPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 2) return value;

    const resultPosts = [];

    for (const post of value) {
      if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.created.indexOf(arg) > -1) {
        resultPosts.push(post);
      }
    };
    return resultPosts;
  }

}
