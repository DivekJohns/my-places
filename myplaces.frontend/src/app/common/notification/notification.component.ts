import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from '../../shared/models/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  private subscription: Subscription;

  constructor(private notificationSvc: NotificationService) { }

  /**
   * @description To push the notification into the array
   * @param notification of type notification
   */
  private _addNotification(notification: Notification) {
    this.notifications.push(notification);
    setTimeout(() => this.close(notification), notification.timeout);
  }

  ngOnInit() {
    this.subscription = this.notificationSvc.notificationObservable().subscribe(notification => this._addNotification(notification));
  }


  /**
   * @description close the popup or the notification by filtering the particular notification from the array
   * @param notification accepts a Notification object
   */
  close(notification: Notification): void {
    this.notifications = this.notifications.filter(notify => notify.id !== notification.id);
  }

}
