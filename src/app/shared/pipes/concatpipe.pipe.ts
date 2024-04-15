import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatpipe'
})
export class ConcatpipePipe implements PipeTransform {

  transform(value1: string, value2: string): string {
    return value1 +" "+ value2;
  }

}
