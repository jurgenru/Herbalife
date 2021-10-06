import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAppointment'
})
export class FilterAppointmentPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 2) return value;

    const resultAppointment = [];

    for(const post of value) {
      if( post.names.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.phoneNumber.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.created.indexOf(arg) > -1) {
        resultAppointment.push(post);
      }
    };
    return resultAppointment;
  }

}
