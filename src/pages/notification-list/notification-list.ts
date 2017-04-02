import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';

import { LocalNotifications } from 'ionic-native';

import { Notification } from '../../app/notification'
import { NotificationService } from '../../app/notification.service'
import { NotificationEditPage } from '../notification-edit/notification-edit';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationListPage {

  notifications: Array<Notification>;

  updateNotifications(): void {
    this.notificationService.getAllNotifications().then(notifications => {
      this.notifications = notifications;
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public notificationService: NotificationService, platform: Platform) {
      platform.ready().then(() => {
        this.setupNotificationCallback();
      });
  }

  setupNotificationCallback(): void {
    LocalNotifications.on('click', (notification, state) => {
      this.notificationService.deleteNotification(
        new Notification(notification.id, new Date(), '', '')).then(() => {
          this.updateNotifications();
      });
    });
  }

  ionViewDidEnter() {
    this.updateNotifications();
  }

  showNotification(notification: Notification): void {
    this.navCtrl.push(NotificationEditPage, {
      notification: notification
    });
  }

  newNotification(): void {
    this.navCtrl.push(NotificationEditPage, {
      notification: this.notificationService.newNotification()
    });
  }
}
