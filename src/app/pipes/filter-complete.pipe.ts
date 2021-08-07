import { NgIterable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterComplete'
})
export class FilterCompletePipe implements PipeTransform {

  transform(value: any[], filterComplete: boolean): NgIterable<any> {
    if (!filterComplete) return value
    return value.filter(item => !item.isComplete);
  }

}
