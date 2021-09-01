import dayjs from "dayjs";

function calendarFormat(time, options) {
  var defaultOptions = {
    sameDay: '[今天] HH:mm',
    nextDay: '[明天] HH:mm',
    lastDay: '[昨天] HH:mm',
    last2Day: '[前天] HH:mm',
    sameYear: 'MM-DD',
    sameElse: 'YYYY-MM-DD HH:mm'
  }
  options = Object.assign({}, defaultOptions, options);
  var timeDay = dayjs(time);
  var today = dayjs();
  var todayStart = today.startOf('date');
  var lastDayStart = todayStart.add(-1, "day");
  var last2DayStart = todayStart.add(-2, "day");
  var nextStart = todayStart.add(1, "day");
  var next2Start = todayStart.add(2, "day")
  var yearStart = today.startOf('year');
  var yearEnd = today.endOf('year');
  if (timeDay.isBefore(yearStart)) { // 今年以前
    return timeDay.format(options.sameElse);
  }
  if (timeDay.isAfter(yearEnd)) { //今年以后
    return timeDay.format(options.sameElse);
  }
  if (timeDay.isAfter(next2Start)) { //明天之后（今年中）
    return timeDay.format(options.sameYear);
  }
  if (timeDay.isAfter(nextStart)) { //明天
    return timeDay.format(options.nextDay);
  }
  if (timeDay.isAfter(todayStart)) { //今天
    return timeDay.format(options.sameDay);
  }
  if (timeDay.isAfter(lastDayStart)) { //昨天
    return timeDay.format(options.lastDay)
  }
  if (timeDay.isAfter(last2DayStart)) { //前天
    return timeDay.format(options.last2Day);
  }
  return timeDay.format(options.sameYear); //前天之前（今年中）
}

export {
  calendarFormat
}