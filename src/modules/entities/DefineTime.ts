class MyTime {
  day: number | string;
  hour: number | string;
  min: number | string;
  second: number | string;
  constructor(
    day: number | string,
    hour: number | string,
    min: number | string,
    second: number | string
  ) {
    this.day = day;
    this.hour = hour;
    this.min = min;
    this.second = second;
  }
}

export default MyTime;
