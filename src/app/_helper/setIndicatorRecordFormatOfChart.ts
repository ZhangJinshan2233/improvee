import {
  getDaysInMonth,
} from 'date-fns';

export function set_month_record_value(indicatorRecordArray, currentMonth) {

  let daysOfMonth = getDaysInMonth(new Date(currentMonth));
  let recordValues = new Array(daysOfMonth);
  recordValues.fill(null);
  indicatorRecordArray.forEach(indicatorRecord => {
    recordValues[(+indicatorRecord.createDate.slice(8, 10)) - 1] = indicatorRecord.value
  });
  return recordValues
}

export function set_year_record_value(indicatorRecordArray) {
  let recordValues = new Array(12);
  recordValues.fill(null);
  console.log(indicatorRecordArray)
  indicatorRecordArray.forEach(indicatorRecord => {
    let sum = 0.0;
    let averageValue=0;
    for (let i = 0; i < indicatorRecord.records.length; i++) {
      sum +=+(parseFloat(indicatorRecord.records[i].value).toFixed(1))
    }
     averageValue = sum /(indicatorRecord.records.length)
    recordValues[(+indicatorRecord.month) - 1] = averageValue
  });
  return recordValues
}