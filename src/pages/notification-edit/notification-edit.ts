import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { LocalNotifications } from 'ionic-native';

import { Notification } from '../../app/notification'
import { NotificationService } from '../../app/notification.service'

@Component({
  selector: 'page-notification-edit',
  templateUrl: 'notification-edit.html'
})
export class NotificationEditPage {
  // From https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
  formatLocalDate() {
    var now = new Date(),
      tzo = -now.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
      var norm = Math.abs(Math.floor(num));
        return (norm < 10 ? '0' : '') + norm;
      };
    return now.getFullYear()
      + '-' + pad(now.getMonth()+1)
      + '-' + pad(now.getDate())
      + 'T' + pad(now.getHours())
      + ':' + pad(now.getMinutes())
      + ':' + pad(now.getSeconds())
      + dif + pad(tzo / 60)
      + ':' + pad(tzo % 60);
    }


  now: string = this.formatLocalDate();
  max: string = '2112';
  date: string = this.formatLocalDate();
  title: string;
  description: string;

  constructor(public navCtrl: NavController, navParams: NavParams, public notificationService: NotificationService) {

  }

  done(): void {
    this.notificationService.saveNotification(
      new Notification(0, new Date(this.date), this.title, this.description)).then(notification => {
        LocalNotifications.schedule({
          id: notification.id,
          at: notification.date,
          title: notification.title,
          text: notification.text
        });
      });
  }

}
