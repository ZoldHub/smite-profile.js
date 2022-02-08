import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHourService {
  constructor() {}

  getTimeStampApiSmiteFormat(): string {
    var date = new Date();

    return `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  }
}
