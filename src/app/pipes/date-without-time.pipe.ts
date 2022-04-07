import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithoutTime'
})
export class DateWithoutTimePipe implements PipeTransform {

  transform(date: Date) {
    let currentDate = new Date(date);
    return currentDate.toDateString().split('T');
  }

}
