import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratinground'
})
export class RatingroundPipe implements PipeTransform {

  // use this pipe to round a given number to nearest .5 value
  transform(rating): any {
    return rating = (Math.round(rating * 2) / 2).toFixed(1);
  }

}
