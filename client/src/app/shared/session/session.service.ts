import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Session } from './session';
import { Observable } from 'rxjs';
import { DateHourService } from '../date-hour/date-hour.service';

const API = environment.apiURL;
const DEV_ID = environment.devId;
const AUTH_KEY = environment.authKey;

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private http: HttpClient,
    private dateHourService: DateHourService
  ) {}

  getNewSession(): Observable<Session> {
    return this.http.get<Session>(
      `${API}createsessionJson/${DEV_ID}/${AUTH_KEY}/${this.dateHourService.getTimeStampApiSmiteFormat()}`
    );
  }
}
