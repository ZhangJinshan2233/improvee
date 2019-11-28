import { Pipe, PipeTransform } from '@angular/core';
import { format, formatDistanceToNow, differenceInDays, isYesterday, isToday } from 'date-fns';
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): any {
    if (isYesterday(value)) {
      return 'yesterday';
    }
    return differenceInDays(Date.now(), value) > 1 ?
      format(value, 'MMM D, YYYY, H:mm:ss A') : formatDistanceToNow(value, { addSuffix: true });
  }
}


