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
  formatLocalDate(date: Date): string {
    var now = date,
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


  now: string = this.formatLocalDate(new Date());
  max: string = '2112';
  date: string = this.formatLocalDate(new Date());
  notification: Notification;

  constructor(public navCtrl: NavController, navParams: NavParams, public notificationService: NotificationService) {
    this.notification = navParams.get('notification');
    this.date = this.formatLocalDate(this.notification.date);
  }

  done(): void {
    this.navCtrl.pop();
  }

  delete(): void {
    this.notificationService.deleteNotification(this.notification).then(() => {
      if (this.notification.id != 0) {
        LocalNotifications.cancel(this.notification.id);
      }
      // Set notification title empty to prevent autosave on view exit
      this.notification.title = '';
      this.navCtrl.pop();
    });
  }

  ionViewWillLeave(): void {
    // Do not save notifications with empty title
    if (this.notification.title.trim() == '') {
      return;
    }

    let isNew = (this.notification.id == 0);
    this.notification.date = new Date(this.date);
    this.notificationService.saveNotification(this.notification).then(notification => {
      let notifObj = {
        id: notification.id,
        at: notification.date,
        title: notification.title,
        text: notification.text
      }
      if (isNew) {
        LocalNotifications.schedule(notifObj);
      } else {
        LocalNotifications.update(notifObj);
      }
    });
  }

}
