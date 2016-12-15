import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public notificationService: NotificationService) {
    LocalNotifications.on("click", (notification, state) => {
      let alert = this.alertCtrl.create({
        title: "Notification Clicked",
        subTitle: "You just clicked the scheduled notification",
        buttons: ["OK"]
      });
      alert.present();
    });

    LocalNotifications.registerPermission();

    this.notificationService.clear();
  }

  ionViewDidEnter() {
    this.notificationService.getAllNotifications().then(notifications => {
      this.notifications = notifications;
    });
  }

  showNotification(notification: Notification): void {
    this.navCtrl.push(NotificationEditPage, {
      id: notification.id
    });
  }

  newNotification(): void {
    this.navCtrl.push(NotificationEditPage, {});
  }
}
