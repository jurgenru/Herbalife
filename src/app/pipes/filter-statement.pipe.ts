import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatement'
})
export class FilterStatementPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 2) return value;

    const resultStatement = [];

    for(const post of value) {
      if( post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.description.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.created.indexOf(arg) > -1) {
        resultStatement.push(post);
      }
    };
    return resultStatement;
  }

}
