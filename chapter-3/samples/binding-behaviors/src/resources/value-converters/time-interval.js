export class TimeIntervalValueConverter {
  toView(value) {
    if (!(value instanceof Date)) {
      return '';
    }

    var now = new Date();
    var seconds = Math.round((value.getTime() - now.getTime()) / 1000);
    if (seconds > 0) {
      return `in ${seconds} seconds`;
    }
    else if (seconds < 0) {
      return `${-seconds} seconds ago`;
    }
    else {
      return 'just now';
    }
  }
}
