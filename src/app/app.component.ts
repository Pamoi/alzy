import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { NoteListPage } from '../pages/note-list/note-list';
import { NotificationListPage } from '../pages/notification-list/notification-list';
import { HelpPage } from '../pages/help/help';

import { LocalNotifications } from 'ionic-native';

import { Notification } from './notification'
import { NotificationService } from './notification.service'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NoteListPage;
  notePage: any = NoteListPage;
  notificationPage: any = NotificationListPage;
  helpPage: any = HelpPage;

  constructor(public platform: Platform, public alertCtrl: AlertController,
    public notificationService: NotificationService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      LocalNotifications.on('click', (notification, state) => {
        this.presentNotification(notification);
      });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

  presentNotification(notification) {
    let popup = this.alertCtrl.create({
      title: notification.title,
      subTitle: notification.text,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.notificationService.deleteNotification(new Notification(notification.id, new Date(), '', ''));
          }
        }
      ]
    });
    popup.present();
  }
}
