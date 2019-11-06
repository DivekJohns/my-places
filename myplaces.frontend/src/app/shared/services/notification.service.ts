import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Notification} from '../models/Notification';

@Injectable()
export class NotificationService {

  public subject = new Subject<Notification>();
  public index = 0;

  constructor() { }

  notificationObservable(): Observable<Notification> {
    return this.subject.asObservable();
  }
  error(message: string, timeout = 5000) {
    this.subject.next(new Notification(this.index++, 'error', message, timeout));
  }
  info(message: string, timeout = 5000) {
    this.subject.next(new Notification(this.index++, 'info', message, timeout));
  }

}
