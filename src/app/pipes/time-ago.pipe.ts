import { Pipe, PipeTransform } from '@angular/core';
import {
  format, formatDistanceToNow,
  differenceInDays,
  isYesterday,
} from 'date-fns';
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): any {
    if (isYesterday(new Date(value))) {
      return 'yesterday';
    }
    return differenceInDays(Date.now(), value) > 1 ?
      format(new Date(value), 'MMM D, YYYY, H:mm:ss A') : formatDistanceToNow(new Date(value), { addSuffix: true });
  }
}


