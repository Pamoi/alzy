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
  static isCallbackSetup: boolean = false;

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
    if (NotificationListPage.isCallbackSetup) {
      return;
    }

    LocalNotifications.on('click', (notification, state) => {
      let popup = this.alertCtrl.create({
        title: notification.title,
        subTitle: notification.text,
        buttons: ["OK"]
      });
      popup.present();
      this.notificationService.deleteNotification(new Notification(notification.id, new Date(), '', '')).then(() => {
        this.updateNotifications();
      });
    });

    NotificationListPage.isCallbackSetup = true;
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
